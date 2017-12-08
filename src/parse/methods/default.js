export const defaultElement = { querySelector: () => {},
  querySelectorAll: () => []
}

const removingQueries = []

const setScrapper = methodsByName => {
  methodsByName['default'] = (document, url) => {
    // LINK
    const description = (document.querySelector('meta[property="og:description"]') || defaultElement)
      .content
    const excerpt = ([...(document.querySelector('article') || defaultElement)
      .querySelectorAll('p')]
      .find(pElement => pElement.innerHTML.length > 100) || defaultElement)
      .textContent
    const title = (document.querySelector('meta[property="og:title"]') || defaultElement)
      .content
    // RAW
    const articleElement = (document.querySelector('article') || defaultElement)
    removingQueries.forEach(query => {
      const element = articleElement.querySelector(query)
      if (element) {
        element.parentElement.removeChild(element)
      }
    })
    const raw = {
      html: articleElement.innerHTML
    }
    // AUTHORS
    const authors = [
      {
        name: (document.querySelector('p[itemprop="author"]') || defaultElement)
          .textContent
      }
    ]
    // PUBLISHER
    const publisher = {
      name: ((document.querySelector('meta[property="og:site_name"]') || defaultElement)
        .content || '')
        .replace(/\.[a-z]?/, '')
        .replace(/\/$/, '')
    }
    // RETURN
    return {
      collectionName: 'links',
      authors,
      excerpt,
      publisher,
      raw,
      title,
      url: url.split('?')[0].replace(/\/$/, '')
    }
  }
}
export default setScrapper
