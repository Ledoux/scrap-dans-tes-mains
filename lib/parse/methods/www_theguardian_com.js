'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = require('./default');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var setScrapper = function setScrapper(methodsByName) {
  methodsByName['www.theguardian.com'] = function (document) {
    // LINK
    var excerpt = ([].concat(_toConsumableArray((document.querySelector('div.content__article-body') || _default.defaultElement).children)).find(function (element) {
      return element.nodeName === 'P';
    }) || _default.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || {}).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _default.defaultElement).querySelector('img') || {}).src;
    var rawHTML = (document.querySelector('article') || _default.defaultElement).innerHTML;
    // AUTHOR
    var author = {
      name: ((document.querySelector("span[itemprop='author']") || _default.defaultElement).querySelector('span') || _default.defaultElement).textContent,
      imageUrl: ((document.querySelector("div[class='pb-headshot']") || _default.defaultElement).querySelector("img") || _default.defaultElement).src
      // PUBLISHER
    };var publisher = {
      name: 'The Guardian'
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