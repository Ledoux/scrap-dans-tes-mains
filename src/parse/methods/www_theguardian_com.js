import { defaultElement } from './default'

const setScrapper = methodsByName => {
  methodsByName['www.theguardian.com'] = document => {
    // LINK
    const excerpt = ([...(document.querySelector('div.content__article-body') || defaultElement)
      .children]
      .find(element => element.nodeName === 'P') || defaultElement)
      .textContent
    const title = (document.querySelector("h1[itemprop='headline']") || {})
      .textContent
    const imageUrl = ((document.querySelector('.inline-photo') || defaultElement)
      .querySelector('img') || {})
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
      name: 'The Guardian'
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
