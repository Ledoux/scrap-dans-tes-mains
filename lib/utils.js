'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrap = undefined;

var _jsdom = require('jsdom');

var _default = require('./default');

var _scrappers = require('./scrappers');

var getScrap = exports.getScrap = function getScrap(url) {
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
        var scrapper = _scrappers.scrappersByName[scrapperName] || _default.defaultScrapper;
        // call the scrapper and resolve
        resolve(scrapper && scrapper(document, url));
      }
    });
  });
};