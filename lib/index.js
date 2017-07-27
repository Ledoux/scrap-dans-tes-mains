'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrappersByName = exports.getScrap = undefined;

var _scrappers = require('./scrappers');

var _scrappers2 = _interopRequireDefault(_scrappers);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getScrap = _utils.getScrap;
exports.scrappersByName = _scrappers2.default;

var scrapDansTesMains = { getScrap: _utils.getScrap,
  scrappersByName: _scrappers2.default
};
exports.default = scrapDansTesMains;