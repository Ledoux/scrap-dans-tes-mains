'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrap = undefined;

var _jsdom = require('jsdom');

var _methods = require('./methods');

var scrap = exports.scrap = function scrap(url) {
  return new Promise(function (resolve, reject) {
    _jsdom.JSDOM.fromURL(url).then(function (dom) {
      var document = dom.window && dom.window.document;
      if (typeof document === 'undefined') {
        resolve({});
      } else {
        // here we determine the method name, for the moment
        // a method name is equivalent to a host name
        var relativeMatch = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/);
        var methodName = relativeMatch && relativeMatch[1] || 'default';
        var method = _methods.methodsByName[methodName];
        // call the method and resolve
        resolve(method && method(document, url));
      }
    });
  });
};