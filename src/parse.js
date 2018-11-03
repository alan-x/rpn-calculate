const type = require('./type')

function parse(tokens) {
    tokens = tokens.reverse()
    let token
    let rpnList = [], opList = []
    while (tokens.length) {
        token = tokens.pop()
        switch (token.type) {
            case type.TYPE_NUMBER: {
                rpnList.push(token)
                break
            }
            case type.TYPE_OPERATION_ADD: {
                while (opList.length) {
                    let op = opList.pop()
                    if (op.type === type.TYPE_LEFT_BRACKET) {
                        opList.push(op)
                        break
                    } else {
                        rpnList.push(op)
                    }
                }
                opList.push(token)
                break
            }
            case type.TYPE_OPERATION_SUB: {
                while (opList.length) {
                    let op = opList.pop()
                    rpnList.push(op)
                }
                opList.push(token)
                break
            }
            case type.TYPE_OPERATION_MUL: {
            }
            case type.TYPE_OPERATION_DIV: {
            }
            case type.TYPE_LEFT_BRACKET: {
                opList.push(token)
                break
            }
            case type.TYPE_RIGHT_BRACKET: {
                var op = opList.pop()
                while (op.type !== type.TYPE_LEFT_BRACKET) {
                    rpnList.push(op)
                    op = opList.pop()
                }
                break
            }
            default: {
                throw `error type: ${token.type}`
            }
        }
    }

    while (opList.length) {
        rpnList.push(opList.pop())
    }
    return rpnList
}

module.exports = parse