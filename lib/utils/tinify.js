'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var tinify = exports.tinify = function tinify() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var maxLength = config.maxLength || 50;
  var tinyfiedObject = {};
  Object.keys(object).forEach(function (key) {
    var value = object[key];
    if (typeof value === 'string') {
      tinyfiedObject[key] = value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      tinyfiedObject[key] = tinify(value);
    }
  });
  return tinyfiedObject;
};