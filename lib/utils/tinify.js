'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var tinify = exports.tinify = function tinify(value) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var maxLength = config.maxLength || 50;
  if (typeof value === 'string') {
    return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  } else if (Array.isArray(value)) {
    return value.map(function (value) {
      return tinify(value, config);
    });
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    if (value) {
      var tinifyObject = {};
      Object.keys(value).forEach(function (key) {
        return tinifyObject[key] = tinify(value[key], config);
      });
      return tinifyObject;
    }
    return value;
  }
  return value;
};