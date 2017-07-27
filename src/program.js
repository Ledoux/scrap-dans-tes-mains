#!/usr/bin/env node
import program from 'commander'

export default program
  .version(require('../package.json').version)

  // list all the options
  .option('--url [type]', 'Url', 'https://www.washingtonpost.com/news/energy-environment/wp/2017/02/15/its-official-the-oceans-are-losing-oxygen-posing-growing-threats-to-marine-life/?utm_term=.378195a54fc0')

  .option('')

  .parse(process.argv)
