const type = require('./type')


let syntax = {
    [type.TYPE_NUMBER]: [
        type.TYPE_OPERATION_ADD,
        type.TYPE_OPERATION_SUB,
        type.TYPE_OPERATION_MUL,
        type.TYPE_OPERATION_DIV,
        type.TYPE_RIGHT_BRACKET
    ],
    [type.TYPE_OPERATION_ADD]: [
        type.TYPE_NUMBER
    ],
    [type.TYPE_OPERATION_SUB]: [
        type.TYPE_NUMBER
    ],
    [type.TYPE_OPERATION_MUL]: [
        type.TYPE_NUMBER
    ],
    [type.TYPE_OPERATION_DIV]: [
        type.TYPE_NUMBER
    ],
    [type.TYPE_LEFT_BRACKET]: [
        type.TYPE_NUMBER
    ]
}

function analyze(tokens, isFull = false) {
    let bracketCount = 0
    tokens = tokens.reverse()
    let token = tokens.pop()
    if (![type.TYPE_NUMBER, type.TYPE_LEFT_BRACKET].includes(token.type)) {
        throw `syntax error: could not begin with ${token.value}`
    }
    if (token.type === type.TYPE_LEFT_BRACKET) {
        bracketCount++
    }
    while (tokens.length) {
        let next = tokens.pop()
        if (!syntax[token.type].includes(next.type)) throw `syntax error: ${token.value} -> ${next.value}`
        if (next.type === type.TYPE_LEFT_BRACKET) {
            bracketCount++
        }
        if (next.type === type.TYPE_RIGHT_BRACKET) {
            bracketCount--
        }
        token = next
    }
    if (isFull && bracketCount !== 0) throw `syntax error: lack of ( or )`
    return true
}

module.exports = analyze