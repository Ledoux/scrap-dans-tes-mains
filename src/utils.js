import { JSDOM } from 'jsdom'

import scrappersByName from './scrappers'

export const defaultElement = {
  querySelector: () => {},
  querySelectorAll: () => []
}

const removingQueries = []

const defaultScrapper = document => {
  // LINK
  const description = (document.querySelector('meta[property="og:description"]') || defaultElement)
    .content
  const excerpt = ([...(document.querySelector('article') || defaultElement)
    .querySelectorAll('p')]
    .find(pElement => pElement.innerHTML.length > 100) || defaultElement)
    .textContent
  const title = (document.querySelector('meta[property="og:title"]') || defaultElement)
    .content
  // HTML
  const articleElement = (document.querySelector('article') || defaultElement)
  removingQueries.forEach(query => {
    const element = articleElement.querySelector(query)
    if (element) {
      element.parentElement.removeChild(element)
    }
  })
  const rawHTML = articleElement.innerHTML
  // AUTHOR
  const author = {
    name: (document.querySelector('p[itemprop="author"]') || defaultElement)
      .textContent
  }
  // PUBLISHER
  const publisher = {
    name: (document.querySelector('meta[property="og:site_name"]') || defaultElement)
      .content
      .replace(/\.[a-z]?/, '')
      .replace(/\/$/, '')
  }
  // RETURN
  return {
    authorsById: {
      _SCRAP_: author
    },
    linksById: {
      _SCRAP_: {
        authorId: '_SCRAP_',
        description,
        excerpt,
        publisherId: '_SCRAP_',
        rawHTML,
        title
      }
    },
    publishersById: {
      _SCRAP_: publisher
    }
  }
}

export function getScrap (url) {
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
