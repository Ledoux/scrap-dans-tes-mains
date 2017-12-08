import { defaultElement } from './default'

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
    // RAW
    const raw = {
      html: (document.querySelector('article') || defaultElement)
        .innerHTML
    }
    // AUTHOR
    const authors = [{
      name: ((document.querySelector("span[itemprop='author']") || defaultElement)
        .querySelector('span') || defaultElement)
        .textContent,
      imageUrl: ((document.querySelector("div[class='pb-headshot']") || defaultElement)
        .querySelector("img") || defaultElement)
        .src
    }]
    // PUBLISHER
    const publisher = {
      name: 'The Washington Post'
    }
    // RETURN
    return { collectionName: 'links',
      authors,
      excerpt,
      imageUrl,
      publisher,
      raw,
      title,
      url: url.split('?')[0].replace(/\/$/, '')
    }
  }
}
export default setScrapper
