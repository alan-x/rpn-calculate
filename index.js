const tokenize = require('./src/tokenize')
const syntaxAnalyze = require('./src/syntaxAnalyze')
const parse = require('./src/parse')
const calculate = require('./src/calculate')

window.tokenize = tokenize
window.syntaxAnalyze = syntaxAnalyze
window.parse = parse
window.calculate = calculate


export {
    tokenize,
    syntaxAnalyze,
    parse,
    calculate
}