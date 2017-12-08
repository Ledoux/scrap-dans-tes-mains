'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = require('./default');

var setScrapper = function setScrapper(methodsByName) {
  methodsByName['www.washingtonpost.com'] = function (document, url) {
    // LINK
    var excerpt = ((document.querySelector('article') || _default.defaultElement).querySelector('p') || _default.defaultElement).textContent;
    var title = (document.querySelector("h1[itemprop='headline']") || {}).textContent;
    var imageUrl = ((document.querySelector('.inline-photo') || _default.defaultElement).querySelector('img') || _default.defaultElement).src;
    // RAW
    var raw = {
      html: (document.querySelector('article') || _default.defaultElement).innerHTML
      // AUTHOR
    };var authors = [{
      name: ((document.querySelector("span[itemprop='author']") || _default.defaultElement).querySelector('span') || _default.defaultElement).textContent,
      imageUrl: ((document.querySelector("div[class='pb-headshot']") || _default.defaultElement).querySelector("img") || _default.defaultElement).src
    }];
    // PUBLISHER
    var publisher = {
      name: 'The Washington Post'
      // RETURN
    };return { collectionName: 'links',
      authors: authors,
      excerpt: excerpt,
      imageUrl: imageUrl,
      publisher: publisher,
      raw: raw,
      title: title,
      url: url.split('?')[0].replace(/\/$/, '')
    };
  };
};
exports.default = setScrapper;