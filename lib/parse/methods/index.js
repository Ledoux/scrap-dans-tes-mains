'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var methodsByName = exports.methodsByName = {};
var fileNames = ['./default',
/*
'./www_breitbart_com',
'./www_dailymail_co_uk',
'./www_npr_org',
'./www_theguardian_com',
'./www_usatoday_com',
*/
'./www_washingtonpost_com'];
fileNames.forEach(function (fileName) {
  return require(fileName).default(methodsByName);
});