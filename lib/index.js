'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _methods = require('./methods');

Object.keys(_methods).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _methods[key];
    }
  });
});

var _scrap = require('./scrap');

Object.keys(_scrap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scrap[key];
    }
  });
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