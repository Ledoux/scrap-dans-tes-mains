#!/usr/bin/env node
require('babel-polyfill')
const { getScrap, tinyfy } = require('../lib')
const program = require('../lib/program').default

getScrap(program.url).then(scrap =>
  console.log(JSON.stringify(tinyfy(scrap), null, 2))
)
