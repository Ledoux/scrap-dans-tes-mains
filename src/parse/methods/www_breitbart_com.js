import { defaultElement } from './default'

const removingQueries = [
  'h1[itemprop="headline"]',
  '.desktop',
  '.byline',
  '.ndn_embed',
  'time',
  'time',
  '.entry-content h2',
  '.attribution',
  'footer'
]

const setScrapper = methodsByName => {
  methodsByName['www.breitbart.com'] = document => {
    // LINK
    const excerpt = ([...((document.querySelector('article.the-article') || defaultElement)
      .querySelector('div.entry-content') || defaultElement)
      .querySelectorAll('p')]
      .find(pElement => pElement.innerHTML.length > 100) || defaultElement)
      .textContent
    const title = (document.querySelector("h1[itemprop='headline']") || defaultElement)
      .textContent
    const imageUrl = ((document.querySelector('.inline-photo') || defaultElement)
      .querySelector('img') || defaultElement)
      .src
    // HTML
    const articleElement = (document.querySelector('article.the-article') || defaultElement)
    removingQueries.forEach(query => {
      const element = articleElement.querySelector(query)
      if (element) {
        element.parentElement.removeChild(element)
      }
    })
    const rawHTML = articleElement.innerHTML
    // AUTHOR
    const author = {
      name: (document.querySelector("a.byauthor") || defaultElement)
        .textContent,
      imageUrl: (document.querySelector("img[itemprop='image']") || defaultElement)
        .src
    }
    // PUBLISHER
    const publisher = {
      name: 'Breitbart'
    }
    // RETURN
    return {
      authorsById: {
        _scrap_: author
      },
      linksById: {
        _scrap_: {
          authorIds: ['_scrap_'],
          excerpt,
          imageUrl,
          publisherId: '_scrap_',
          title
        }
      },
      publishersById: {
        _scrap_: publisher
      },
      rawsById: {
        _scrap_: {
          html: rawHTML
        }
      }
    }
  }
}
export default setScrapper
