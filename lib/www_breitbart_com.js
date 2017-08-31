'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var removingQueries = ['h1[itemprop="headline"]', '.desktop', '.byline', '.ndn_embed', 'time', 'time', '.entry-content h2', '.attribution', 'footer'];

var setScrapper = function setScrapper(scrappersByName) {
  scrappersByName['www.breitbart.com'] = function (document) {
    // LINK
    var excerpt = ([].concat(_toConsumableArray(((document.querySelector('article.the-article') || _utils.defaultElement).querySelector('div.entry-content').defaultElement || _utils.defaultElement).querySelectorAll('p'))).find(function (pElement) {
      return pElement.innerHTML.length > 100;
    }) || _utils.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || {}).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _utils.defaultElement).querySelector('img') || _utils.defaultElement).src;
    // HTML
    var articleElement = document.querySelector('article.the-article') || _utils.defaultElement;
    removingQueries.forEach(function (query) {
      var element = articleElement.querySelector(query);
      if (element) {
        element.parentElement.removeChild(element);
      }
    });
    var rawHTML = articleElement.innerHTML;
    // AUTHOR
    var author = {
      name: (document.querySelector("a.byauthor") || _utils.defaultElement).textContent,
      imageUrl: (document.querySelector("img[itemprop='image']") || _utils.defaultElement).src
      // PUBLISHER
    };var publisher = {
      name: 'Breitbart'
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
          title: title
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