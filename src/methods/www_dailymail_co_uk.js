import { defaultElement } from './default'

const setScrapper = methodsByName => {
  methodsByName['www.dailymail.co.uk'] = document => {
    // LINK
    const excerpt = ([...(document.querySelector("div[itemprop='articleBody']") || defaultElement)
      .children]
      .find(element => element.nodeName === 'P') || defaultElement)
      .textContent
    const title = (document.querySelector("meta[itemprop='headline']") || {})
      .textContent
    const imageUrl = ((document.querySelector("img[itemprop='image']") || defaultElement)
      .querySelector('meta') || defaultElement)
      .src
    const rawHTML = (document.querySelector("div[itemprop='articleBody']") || defaultElement)
      .textContent
    // AUTHOR
    const author = {
      name: ((document.querySelector("div[itemprop='author']") || defaultElement)
        .querySelector('meta') || defaultElement)
        .innerHTML,
      imageUrl: ((document.querySelector("img[itemprop='image']") || defaultElement)
        .querySelector('meta') || defaultElement)
        .src
    }
    // PUBLISHER
    const publisher = {
      name: 'Dailymail'
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
          title
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
