const setScrapper = methodsByName => {
  methodsByName['www.biogeosciences.net'] = (document, url) => {
    // LINK
    const title = (document.querySelector('span.pb_article_title') || defaultElement)
      .innerText
    // PUBLISHER
    const publisher = {
      name: 'biogeosciences'
    }
    // RETURN
    return {
      linksById: {
        _SCRAP_: {
          publisherId: '_SCRAP_',
          title,
          url
        }
      },
      publishersById: {
        _SCRAP_: publisher
      }
    }
  }
}
export default setScrapper
