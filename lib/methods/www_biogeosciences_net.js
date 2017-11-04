'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setScrapper = function setScrapper(methodsByName) {
  methodsByName['www.biogeosciences.net'] = function (document, url) {
    // LINK
    var title = (document.querySelector('span.pb_article_title') || defaultElement).innerText;
    // PUBLISHER
    var publisher = {
      name: 'biogeosciences'
      // RETURN
    };return {
      linksById: {
        _SCRAP_: {
          publisherId: '_SCRAP_',
          title: title,
          url: url
        }
      },
      publishersById: {
        _SCRAP_: publisher
      }
    };
  };
};
exports.default = setScrapper;