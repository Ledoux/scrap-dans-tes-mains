#!/usr/bin/env node
require('babel-polyfill')
const { getScrap } = require('../lib')
const program = require('../lib/program').default

getScrap(program.url).then(scrap => console.log(scrap))
