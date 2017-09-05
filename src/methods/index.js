export const methodsByName = {}
const fileNames = [
  './default',
  './www_breitbart_com',
  './www_dailymail_co_uk',
  './www_npr_org',
  './www_theguardian_com',
  './www_usatoday_com',
  './www_washingtonpost_com'
]
fileNames.forEach(fileName => require(fileName).default(methodsByName))
