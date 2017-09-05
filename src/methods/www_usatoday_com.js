import { defaultElement } from '../default'

const setScrapper = methodsByName => {
  methodsByName['www.usatoday.com'] = document => {
    // LINK
    const excerpt = ([...(document.querySelector("div[itemprop='articleBody']") || defaultElement)
      .children]
      .find(element => element.nodeName === 'P') || defaultElement)
      .textContent
    const title = (document.querySelector("h1[itemprop='headline']") || defaultElement)
      .textContent
    const imageUrl = ((document.querySelector('.inline-photo') || defaultElement)
      .querySelector('img') || defaultElement)
      .src
    const rawHTML = document.querySelector('article')
      .innerHTML
    // AUTHOR
    const author = {
      name: (document.querySelector("a[rel='author']") || defaultElement)
        .textContent
        .trim(),
      imageUrl: null
    }
    // PUBLISHER
    const publisher = {
      name: 'USA Today'
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
