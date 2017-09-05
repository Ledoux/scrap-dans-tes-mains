import { JSDOM } from 'jsdom'

import { methodsByName } from './methods'

export const scrap = url => {
  return new Promise ((resolve, reject) => {
    JSDOM.fromURL(url)
      .then(dom => {
        const document = dom.window && dom.window.document
        if (typeof document === 'undefined') {
          resolve({})
        } else {
          // here we determine the method name, for the moment
          // a method name is equivalent to a host name
          const relativeMatch = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/)
          const methodName = relativeMatch && relativeMatch[1] || 'default'
          const method = methodsByName[methodName]
          // call the method and resolve
          resolve(method && method(document, url))
        }
      })
  })
}
