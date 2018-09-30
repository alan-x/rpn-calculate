const type = require('./../src/type').type
const getType = require('./../src/type').getType

const syntax = {
    [type.TYPE_EMPTY]: [
        type.TYPE_LEFT_BRACKET,
        type.TYPE_NUMBER
    ],
    [type.TYPE_NUMBER]: [
        type.TYPE_NUMBER,
        type.TYPE_RIGHT_BRACKET,
        type.TYPE_OPERATION
    ],
    [type.TYPE_OPERATION]: [
        type.TYPE_NUMBER,
        type.TYPE_LEFT_BRACKET
    ],
    [type.TYPE_LEFT_BRACKET]: [
        type.TYPE_NUMBER
    ],
    [type.TYPE_RIGHT_BRACKET]: [
        type.TYPE_OPERATION
    ]
}

function syntaxAnalyzer(pre, now) {
    return !!syntax[pre] && syntax[pre].find((syntax) => syntax === now)
}

function syntaxCheck(pre, now) {
    if (!syntaxAnalyzer(pre, now)) {
        throw `syntax error: '${pre}' -> '${now}'`
    }
    return true
}

function syntaxCheckWithText(text = '') {
    if (text.length === 0) {
        return true
    }
    text = text.split('').reverse()

    var pre = type.TYPE_EMPTY, next = getType(text.pop())


    while (text.length >= 0) {
        syntaxCheck(pre, next)
        if (text.length === 0) break
        pre = next
        next = getType(text.pop())
    }

    return true
}

module.exports = {
    syntaxAnalyzer,
    syntaxCheck,
    syntaxCheckWithText
}