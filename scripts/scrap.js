const { getScrap } = require('../lib/program')
const program = require('../lib/program').default

getScrap(program.url).then(scrap => console.log(scrap))
