import { defaultElement } from '../default'

const setScrapper = methodsByName => {
  methodsByName['www.washingtonpost.com'] = (document, url) => {
    // LINK
    const excerpt = ((document.querySelector('article') || defaultElement)
      .querySelector('p') || defaultElement)
      .textContent
    const title = (document.querySelector("h1[itemprop='headline']") || {})
      .textContent
    const imageUrl = ((document.querySelector('.inline-photo') || defaultElement)
      .querySelector('img') || defaultElement)
      .src
    const rawHTML = (document.querySelector('article') || defaultElement)
      .innerHTML
    // AUTHOR
    const author = {
      name: ((document.querySelector("span[itemprop='author']") || defaultElement)
        .querySelector('span') || defaultElement)
        .textContent,
      imageUrl: ((document.querySelector("div[class='pb-headshot']") || defaultElement)
        .querySelector("img") || defaultElement)
        .src
    }
    // PUBLISHER
    const publisher = {
      name: 'The Washington Post'
    }
    // RETURN
    return {
      authorsById: {
        _SCRAP_: author
      },
      linksById: {
        _SCRAP_: {
          authorId: '_SCRAP_',
          excerpt,
          imageUrl,
          publisherId: '_SCRAP_',
          title,
          url: url.split('?')[0]
                  .replace(/\/$/, '')
        }
      },
      publishersById: {
        _SCRAP_: publisher
      },
      rawsById: {
        _SCRAP_: {
          html: rawHTML
        }
      }
    }
  }
}
export default setScrapper
