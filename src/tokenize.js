const type = require('./type')

function tokenize(input) {
    let tokens = input.split('').reverse()
    let result = []
    let lexeme
    while (tokens.length) {
        lexeme = tokens.pop()
        if (lexeme.match(/[0-9]/)) {
            let next = tokens.pop()
            while (next !== undefined) {
                if (!next.match(/[0-9]/)) break
                lexeme += next
                next = tokens.pop()
            }
            result.push({
                type: type.TYPE_NUMBER,
                value: +lexeme
            })
            lexeme = next
        }
        if (lexeme === undefined) break
        switch (lexeme) {
            case '(': {
                result.push({
                    type: type.TYPE_LEFT_BRACKET,
                    value: '(',
                })
                continue
            }
            case ')': {
                result.push({
                    type: type.TYPE_RIGHT_BRACKET,
                    value: ')',
                })
                continue
            }
            case '+': {
                result.push({
                    type: type.TYPE_OPERATION_ADD,
                    value: '+',
                })
                continue
            }
            case '-': {
                result.push({
                    type: type.TYPE_OPERATION_SUB,
                    value: '-',
                })
                continue
            }
            case '*': {
                result.push({
                    type: type.TYPE_OPERATION_MUL,
                    value: '*',

                })
                continue
            }
            case '/': {
                result.push({
                    type: type.TYPE_OPERATION_DIV,
                    value: '/',
                })
                continue
            }
            default: {
                throw `error input: ${lexeme}`
            }
        }

    }
    return result
}

module.exports = tokenize

