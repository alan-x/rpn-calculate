const tokenize = require('./src/tokenize')
const syntaxAnalyze = require('./src/syntaxAnalyze')
const parse = require('./src/parse')
const calculate = require('./src/calculate')

function calculateText(input) {
    let tokens = tokenize(input)
    syntaxAnalyze(tokens)
    return calculate(parse(tokenize(input)))
}

function parseText(input) {
    syntaxAnalyze(tokenize(input))
    return parse(tokenize(input))
}

function syntaxAnalyzeText(input) {
    return syntaxAnalyze(tokenize(input))
}

window.tokenize = tokenize
window.syntaxAnalyze = syntaxAnalyze
window.syntaxAnalyzeText = syntaxAnalyzeText
window.parse = parse
window.calculate = calculate


module.exports = {
    tokenize,
    syntaxAnalyze,
    syntaxAnalyzeText,
    parse,
    parseText,
    calculate,
    calculateText
}