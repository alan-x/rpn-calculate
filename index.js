const parse = require('./src/parse')
const calculate = require('./src/calculate')
const syntaxAnalyzer = require('./src/syntaxAnalyzer')

module.exports = {
    parse: parse,
    calculate: calculate.calculate,
    directCalculate: calculate.directCalculate,
    syntaxAnalyzer: syntaxAnalyzer.syntaxAnalyzer,
    syntaxCheck:syntaxAnalyzer.syntaxCheck,
    syntaxCheckWithText:syntaxAnalyzer.syntaxCheckWithText
}