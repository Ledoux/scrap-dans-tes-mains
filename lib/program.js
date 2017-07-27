#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _commander2.default.version(require('../package.json').version)

// list all the options
.option('--url [type]', 'Url', 'https://www.washingtonpost.com/news/energy-environment/wp/2017/02/15/its-official-the-oceans-are-losing-oxygen-posing-growing-threats-to-marine-life/?utm_term=.378195a54fc0').option('').parse(process.argv);