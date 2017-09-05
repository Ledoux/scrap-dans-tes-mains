'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = require('../default');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var setScrapper = function setScrapper(methodsByName) {
  methodsByName['www.dailymail.co.uk'] = function (document) {
    // LINK
    var excerpt = ([].concat(_toConsumableArray((document.querySelector("div[itemprop='articleBody']") || _default.defaultElement).children)).find(function (element) {
      return element.nodeName === 'P';
    }) || _default.defaultElement).textContent;
    var title = (document.querySelector("meta[itemprop='headline']") || {}).textContent;
    var imageUrl = ((document.querySelector("img[itemprop='image']") || _default.defaultElement).querySelector('meta') || _default.defaultElement).src;
    var rawHTML = (document.querySelector("div[itemprop='articleBody']") || _default.defaultElement).textContent;
    // AUTHOR
    var author = {
      name: ((document.querySelector("div[itemprop='author']") || _default.defaultElement).querySelector('meta') || _default.defaultElement).innerHTML,
      imageUrl: ((document.querySelector("img[itemprop='image']") || _default.defaultElement).querySelector('meta') || _default.defaultElement).src
      // PUBLISHER
    };var publisher = {
      name: 'Dailymail'
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