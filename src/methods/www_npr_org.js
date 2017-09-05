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
