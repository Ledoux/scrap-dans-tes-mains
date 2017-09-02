import { JSDOM } from 'jsdom'

import { defaultScrapper } from './default'
import { scrappersByName } from './scrappers'

export const getScrap = url => {
  return new Promise ((resolve, reject) => {
    JSDOM.fromURL(url)
      .then(dom => {
        const document = dom.window && dom.window.document
        if (typeof document === 'undefined') {
          resolve({})
        } else {
          // here we determine the scrapper name, for the moment
          // a scrapper name is equivalent to a host name
          const relativeMatch = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/)
          const scrapperName = relativeMatch && relativeMatch[1]
          const scrapper = scrappersByName[scrapperName] || defaultScrapper
          // call the scrapper and resolve
          resolve(scrapper && scrapper(document, url))
        }
      })
  })
}
