'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultElement = exports.defaultElement = { querySelector: function querySelector() {},
  querySelectorAll: function querySelectorAll() {
    return [];
  }
};

var removingQueries = [];

var defaultScrapper = exports.defaultScrapper = function defaultScrapper(document, url) {
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
    name: ((document.querySelector('meta[property="og:site_name"]') || defaultElement).content || '').replace(/\.[a-z]?/, '').replace(/\/$/, '')
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
        title: title,
        url: url
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