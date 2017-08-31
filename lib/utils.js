'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultElement = undefined;
exports.getScrap = getScrap;

var _jsdom = require('jsdom');

var _scrappers = require('./scrappers');

var _scrappers2 = _interopRequireDefault(_scrappers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultElement = exports.defaultElement = {
  querySelector: function querySelector() {},
  querySelectorAll: function querySelectorAll() {
    return [];
  }
};

var removingQueries = [];

var defaultScrapper = function defaultScrapper(document) {
  // LINK
  var description = (document.querySelector('meta[property="og:description"]') || defaultElement).content;
  var excerpt = ([].concat(_toConsumableArray((document.querySelector('article') || defaultElement).querySelectorAll('p'))).find(function (pElement) {
    return pElement.innerHTML.length > 100;
  }) || defaultElement).textContent;
  var title = (document.querySelector('meta[property="og:title"]') || defaultElement).content;
  // HTML
  var articleElement = document.querySelector('article') || defaultElement;
  removingQueries.forEach(function (query) {
    var element = articleElement.querySelector(query);
    if (element) {
      element.parentElement.removeChild(element);
    }
  });
  var rawHTML = articleElement.innerHTML;
  // AUTHOR
  var author = {
    name: (document.querySelector('p[itemprop="author"]') || defaultElement).textContent
    // PUBLISHER
  };var publisher = {
    name: (document.querySelector('meta[property="og:site_name"]') || defaultElement).content.replace(/\.[a-z]?/, '').replace(/\/$/, '')
    // RETURN
  };return {
    authorsById: {
      _SCRAP_: author
    },
    linksById: {
      _SCRAP_: {
        authorId: '_SCRAP_',
        description: description,
        excerpt: excerpt,
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

function getScrap(url) {
  return new Promise(function (resolve, reject) {
    _jsdom.JSDOM.fromURL(url).then(function (dom) {
      var document = dom.window && dom.window.document;
      if (typeof document === 'undefined') {
        resolve({});
      } else {
        // here we determine the scrapper name, for the moment
        // a scrapper name is equivalent to a host name
        var relativeMatch = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/);
        var scrapperName = relativeMatch && relativeMatch[1];
        var scrapper = _scrappers2.default[scrapperName] || defaultScrapper;
        // call the scrapper and resolve
        resolve(scrapper && scrapper(document, url));
      }
    });
  });
}