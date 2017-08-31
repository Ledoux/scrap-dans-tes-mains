'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var setScrapper = function setScrapper(scrappersByName) {
  scrappersByName['www.theguardian.com'] = function (document) {
    // LINK
    var excerpt = ([].concat(_toConsumableArray((document.querySelector('div.content__article-body') || _utils.defaultElement).children)).find(function (element) {
      return element.nodeName === 'P';
    }) || _utils.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || {}).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _utils.defaultElement).querySelector('img') || {}).src;
    var rawHTML = (document.querySelector('article') || _utils.defaultElement).innerHTML;
    // AUTHOR
    var author = {
      name: ((document.querySelector("span[itemprop='author']") || _utils.defaultElement).querySelector('span') || _utils.defaultElement).textContent,
      imageUrl: ((document.querySelector("div[class='pb-headshot']") || _utils.defaultElement).querySelector("img") || _utils.defaultElement).src
      // PUBLISHER
    };var publisher = {
      name: 'The Guardian'
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