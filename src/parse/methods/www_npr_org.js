import { defaultElement } from './default'

const setScrapper = methodsByName => {
  methodsByName['www.npr.org'] = document => {
    // LINK
    const excerpt = ([...((document.querySelector('article') || defaultElement)
      .querySelector('div.storytext') || defaultElement)
      .children]
      .find(element => element.nodeName === 'P') || defaultElement)
      .textContent
    const title = (document.querySelector("h1[itemprop='headline']") || defaultElement)
      .textContent
    const imageUrl = ((document.querySelector('.inline-photo') || defaultElement)
      .querySelector('img') || defaultElement)
      .src
    const rawHTML = (document.querySelector('article') || defaultElement)
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
      name: 'NPR'
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
