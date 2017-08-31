import aws from 'aws-sdk'
import jsdom from 'jsdom'
import { Readable } from 'stream'
import webshot from 'webshot'

import { getScrap } from './utils'

export function useScrap (app, config) {
  // unpack
  const { awsConfig,
    BucketName,
    routePath,
    webshotsBucket
  } = config
  // update
  const s3 = new aws.S3()
  aws.config.update(awsConfig)
  // s3
  const getWebshotUrl = async (url) => {
    return new Promise((resolve, reject) => {
      const fileName = url
        //.split('?')[0]
        .replace(/\/$/, '')
        .replace(/\//g, '-')
        .replace(/\./g, '_')
      const getObjectConfig = {
        Bucket: BucketName,
        Key: `webshots/${fileName}`,
      }
      const uploadConfig = Object.assign({
        ContentType: 'image/png',
        ACL: 'public-read'
      }, getObjectConfig)
      // check first
      s3.headObject(uploadConfig, (err, metadata) => {
        // handle no object on cloud here
        if (err && err.code === 'NotFound') {
          reject(err)
        } else {
          // Try to get an existing object
          s3.getObject(getObjectConfig)
            .on('success', response => {
              // just get the signedUrl
              s3.getSignedUrl('getObject', getObjectConfig, (err, signedUrl) => {
                if (err) {
                  reject(err)
                  return
                } else if (signedUrl) {
                  const webshotUrl = signedUrl.split('?')[0]
                  resolve(webshotUrl)
                }
              })
            }).on('error', error => {
              // do the webshot
              const renderStream = webshot(url, (err, stream) => {
                uploadConfig.Body = new Readable().wrap(stream)
                s3.upload(uploadConfig, (err, payload) => {
                  if (err) {
                    reject(err)
                  } else {
                    resolve(payload.Location)
                  }
                })
              })
            }).send()
        }
      })
    }).catch(err => console.warn(err))
  }
  // get
  app.get(routePath, async (req, res) => {
    // unpack
    const { url } = req.query
    // json
    const json = {}
    // try
    try {
      // scrap
      const scrap = await getScrap(url)
      json.scrap = scrap
      // webshot, make sure the scrap worked first
      const webshotUrl = scrap && await getWebshotUrl(url)
      json.webshotUrl = webshotUrl
      //
    } catch (error) {
      json.error = error
      console.warn('scrap api', error)
    }
    // send
    res.json(json)
  })
}
