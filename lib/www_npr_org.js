'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var setScrapper = function setScrapper(scrappersByName) {
  scrappersByName['www.npr.org'] = function (document) {
    // LINK
    var excerpt = ([].concat(_toConsumableArray(((document.querySelector('article') || _utils.defaultElement).querySelector('div.storytext') || _utils.defaultElement).children)).find(function (element) {
      return element.nodeName === 'P';
    }) || _utils.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || _utils.defaultElement).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _utils.defaultElement).querySelector('img') || _utils.defaultElement).src;
    var rawHTML = (document.querySelector('article') || _utils.defaultElement).innerHTML;
    // AUTHOR
    var author = {
      name: (document.querySelector("a[rel='author']") || _utils.defaultElement).textContent.trim(),
      imageUrl: null
      // PUBLISHER
    };var publisher = {
      name: 'NPR'
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
          rawHTML: rawHTML,
          title: title
        }
      },
      publishersById: {
        _SCRAP_: publisher
      }
    };
  };
};
exports.default = setScrapper;