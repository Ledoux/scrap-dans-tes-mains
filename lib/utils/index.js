'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tinify = require('./tinify');

Object.keys(_tinify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tinify[key];
    }
  });
});

var _url = require('./url');

Object.keys(_url).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _url[key];
    }
  });
});