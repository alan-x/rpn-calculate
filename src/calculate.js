const type = require('./type')

function calOnce(num1, num2, op) {
    switch (op.type) {
        case type.TYPE_OPERATION_ADD: {
            return num1 + num2
        }
        case type.TYPE_OPERATION_SUB: {
            return num1 - num2
        }
        case type.TYPE_OPERATION_MUL: {
            return num1 * num2
        }
        case type.TYPE_OPERATION_DIV: {
            return num1 / num2
        }
        default: {
            throw `unkonw operation: ${op.type}:${op.value}`
        }
    }
}

function calculate(tokens) {
    tokens = tokens.reverse()
    let token
    let numList = []
    while (tokens.length) {
        token = tokens.pop()
        switch (token.type) {
            case type.TYPE_NUMBER: {
                numList.push(token.value)
                console.log(numList)
                break
            }
            case type.TYPE_OPERATION_ADD: {
            }
            case type.TYPE_OPERATION_SUB: {
            }
            case type.TYPE_OPERATION_MUL: {
            }
            case type.TYPE_OPERATION_DIV: {
                let num1 = numList.pop()
                let num2 = numList.pop()
                numList.push(calOnce(num2, num1, token))
                console.log(`${num2}${token.value}${num1}`)
                console.log(numList)
                break
                break
            }
            default: {
                throw `error: unknow type ${token.value}`
            }
        }
    }

    return numList[0]
}


module.exports = calculate