const type = require('./type')

const opMap = {
    '(': type.TYPE_LEFT_BRACKET,
    ')': type.TYPE_RIGHT_BRACKET,
    '+': type.TYPE_OPERATION_ADD,
    '-': type.TYPE_OPERATION_SUB,
    '*': type.TYPE_OPERATION_MUL,
    '/': type.TYPE_OPERATION_DIV
}

function tokenize(input) {
    let tokens = input.split('').reverse()
    let result = []
    let token
    while (tokens.length) {
        token = tokens.pop()
        if (token.match(/[0-9]/)) {
            let next = tokens.pop()
            while (next !== undefined) {
                if (!next.match(/[0-9]/)) break
                token += next
                next = tokens.pop()
            }
            result.push({
                type: type.TYPE_NUMBER,
                value: +token
            })
            token = next
        }
        if (token === undefined) break

        let opType = opMap[token]
        if (!opType) throw `error input: ${token}`
        result.push({
            type: opType,
            value: token,
        })
    }
    return result
}

module.exports = tokenize

