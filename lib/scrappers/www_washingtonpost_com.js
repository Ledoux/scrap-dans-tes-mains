'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = require('../default');

var setScrapper = function setScrapper(scrappersByName) {
  scrappersByName['www.washingtonpost.com'] = function (document, url) {
    // LINK
    var excerpt = ((document.querySelector('article') || _default.defaultElement).querySelector('p') || _default.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || {}).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _default.defaultElement).querySelector('img') || _default.defaultElement).src;
    var rawHTML = (document.querySelector('article') || _default.defaultElement).innerHTML;
    // AUTHOR
    var author = {
      name: ((document.querySelector("span[itemprop='author']") || _default.defaultElement).querySelector('span') || _default.defaultElement).textContent,
      imageUrl: ((document.querySelector("div[class='pb-headshot']") || _default.defaultElement).querySelector("img") || _default.defaultElement).src
      // PUBLISHER
    };var publisher = {
      name: 'The Washington Post'
      // RETURN
    };return {
      authorsById: {
        _SCRAP_: author
      },
      linksById: {
        _SCRAP_: {
          authorId: '_SCRAP_',
          excerpt: excerpt,
          imageUrl: imageUrl,
          publisherId: '_SCRAP_',
          title: title,
          url: url.split('?')[0].replace(/\/$/, '')
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
    };
  };
};
exports.default = setScrapper;