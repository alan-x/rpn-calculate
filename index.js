const parse = require('./src/parse')
const calculate = require('./src/calculate')

module.exports = {
    parse: parse,
    calculate: calculate.calculate,
    directCalculate: calculate.directCalculate
}