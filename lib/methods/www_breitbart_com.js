'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = require('./default');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var removingQueries = ['h1[itemprop="headline"]', '.desktop', '.byline', '.ndn_embed', 'time', 'time', '.entry-content h2', '.attribution', 'footer'];

var setScrapper = function setScrapper(methodsByName) {
  methodsByName['www.breitbart.com'] = function (document) {
    // LINK
    var excerpt = ([].concat(_toConsumableArray(((document.querySelector('article.the-article') || _default.defaultElement).querySelector('div.entry-content') || _default.defaultElement).querySelectorAll('p'))).find(function (pElement) {
      return pElement.innerHTML.length > 100;
    }) || _default.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || _default.defaultElement).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _default.defaultElement).querySelector('img') || _default.defaultElement).src;
    // HTML
    var articleElement = document.querySelector('article.the-article') || _default.defaultElement;
    removingQueries.forEach(function (query) {
      var element = articleElement.querySelector(query);
      if (element) {
        element.parentElement.removeChild(element);
      }
    });
    var rawHTML = articleElement.innerHTML;
    // AUTHOR
    var author = {
      name: (document.querySelector("a.byauthor") || _default.defaultElement).textContent,
      imageUrl: (document.querySelector("img[itemprop='image']") || _default.defaultElement).src
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