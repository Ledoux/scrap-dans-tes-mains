'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = require('./default');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var setScrapper = function setScrapper(methodsByName) {
  methodsByName['www.usatoday.com'] = function (document) {
    // LINK
    var excerpt = ([].concat(_toConsumableArray((document.querySelector("div[itemprop='articleBody']") || _default.defaultElement).children)).find(function (element) {
      return element.nodeName === 'P';
    }) || _default.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || _default.defaultElement).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _default.defaultElement).querySelector('img') || _default.defaultElement).src;
    var rawHTML = document.querySelector('article').innerHTML;
    // AUTHOR
    var author = {
      name: (document.querySelector("a[rel='author']") || _default.defaultElement).textContent.trim(),
      imageUrl: null
      // PUBLISHER
    };var publisher = {
      name: 'USA Today'
      // RETURN
    };return {
      authorsById: {
        _scrap_: author
      },
      linksById: {
        _scrap_: {
          authorIds: ['_scrap_'],
          excerpt: excerpt,
          imageUrl: imageUrl,
          publisherId: '_scrap_',
          title: title
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
    };
  };
};
exports.default = setScrapper;