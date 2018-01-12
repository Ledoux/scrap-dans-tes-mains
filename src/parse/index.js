import { JSDOM } from 'jsdom'
import merge from 'lodash.merge'

import { methodsByName } from './methods'
import { tinify } from '../utils/tinify'

export async function parse (url, config = {}) {
  // unpack
  const { pythonUrl } = config
  // check
  let pythonParse
  if (pythonUrl) {
    const parseUrl = `${pythonUrl}/parse?url=${url}`
    const result = await fetch(parseUrl)
    pythonParse = await result.json()
  }
  // console.log('pythonParse', tinify(pythonParse))
  // jsdom
  let jsParse
  const dom = await JSDOM.fromURL(url)
  const document = dom.window && dom.window.document
  if (typeof document !== 'undefined') {
    // here we determine the method name, for the moment
    // a method name is equivalent to a host name
    const relativeMatch = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/)
    const methodName = relativeMatch && relativeMatch[1]
    const method = methodsByName[methodName] || methodsByName['default']
    // call the method and resolve
    jsParse = method && method(document, url)
  }
  // console.log('jsParse', tinify(jsParse))
  // return
  return merge({}, pythonParse, jsParse)
}
