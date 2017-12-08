'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = undefined;

var _jsdom = require('jsdom');

var _methods = require('./methods');

var parse = exports.parse = function parse(url) {
  return new Promise(function (resolve, reject) {
    _jsdom.JSDOM.fromURL(url).then(function (dom) {
      var document = dom.window && dom.window.document;
      if (typeof document === 'undefined') {
        resolve({});
      } else {
        // here we determine the method name, for the moment
        // a method name is equivalent to a host name
        var relativeMatch = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/);
        var methodName = relativeMatch && relativeMatch[1];
        var method = _methods.methodsByName[methodName] || _methods.methodsByName['default'];
        // call the method and resolve
        resolve(method && method(document, url));
      }
    });
  });
};