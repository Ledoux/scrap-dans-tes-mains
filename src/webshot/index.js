import { Readable } from 'stream'
import webshot from 'webshot'

import { exists } from '../utils'

export function webshotToS3 (url, config = {}) {
  // check
  const exists = exists(url)
  if (!exists.isExistingUrl) {
    console.warn('not good url')
    return exists
  }
  // unpack
  const { bucketName, s3 } = config
  if (!bucketName) {
    console.warn('You need to provide a bucketName')
    return
  }
  // promise
  return new Promise((resolve, reject) => {
    const fileName = url
      //.split('?')[0]
      .replace(/\/$/, '')
      .replace(/\//g, '-')
      .replace(/\./g, '_')
    const getObjectConfig = {
      Bucket: bucketName,
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
