#!/usr/bin/env node
require('babel-polyfill')
const { getScrap, tinify } = require('../lib')
const program = require('../lib/program').default

getScrap(program.url).then(scrap =>
  console.log(JSON.stringify(tinify(scrap), null, 2))
)
