'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var setScrapper = function setScrapper(scrappersByName) {
  scrappersByName['www.washingtonpost.com'] = function (document, url) {
    // LINK
    var excerpt = ((document.querySelector('article') || _utils.defaultElement).querySelector('p') || _utils.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || {}).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _utils.defaultElement).querySelector('img') || _utils.defaultElement).src;
    var rawHTML = (document.querySelector('article') || _utils.defaultElement).innerHTML;
    // AUTHOR
    var author = {
      name: ((document.querySelector("span[itemprop='author']") || _utils.defaultElement).querySelector('span') || _utils.defaultElement).textContent,
      imageUrl: ((document.querySelector("div[class='pb-headshot']") || _utils.defaultElement).querySelector("img") || _utils.defaultElement).src
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