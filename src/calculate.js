const type = require('./type')

function calOnce(num1, num2, op) {
    switch (op.type) {
        case type.TYPE_OPERATION_ADD: {
            return  num1+ num2
        }
        case type.TYPE_OPERATION_SUB: {
            return num2 - num1
        }
        case type.TYPE_OPERATION_MUL: {
            return num2 * num1
        }
        case type.TYPE_OPERATION_DIV: {
            return num2 / num1
        }
        default: {
            throw `unkonw operation: ${op.type}:${op.value}`
        }
    }
}

function calculate(tokens) {
    tokens = tokens.reverse()
    let numberList = []
    let operationList = []
    let token
    while (tokens.length) {
        token = tokens.pop()
        console.log({token})
        switch (token.type) {
            case type.TYPE_NUMBER: {
                numberList.push(token.value)
                console.log(numberList, operationList)

                break
            }
            case type.TYPE_LEFT_BRACKET: {
                operationList.push(token)
                console.log(numberList, operationList)

                break
            }
            case type.TYPE_RIGHT_BRACKET: {
                let op = operationList.pop()
                console.log(op)
                let num1 = 0
                let num2 = 0
                while (op.type !== type.TYPE_LEFT_BRACKET) {
                    num1 = numberList.pop()
                    num2 = numberList.pop()
                    console.log(num1, num2)

                    numberList.push(calOnce(num1, num2, op))
                    op = operationList.pop()
                    console.log(numberList, operationList)

                }
                break
            }
            case type.TYPE_OPERATION_ADD: {
            }
            case type.TYPE_OPERATION_SUB: {
                if (!operationList.length) {
                    operationList.push(token)
                    break
                }
                let op
                while (operationList.length) {
                    op = operationList.pop()
                    if (op.type === type.TYPE_OPERATION_MUL || op.type === type.TYPE_OPERATION_DIV) {
                        numberList.push(calOnce(numberList.pop(),numberList.pop(),op))
                        operationList.push(token)
                        break
                    }else if (op.type === type.TYPE_OPERATION_ADD || op.type === type.TYPE_OPERATION_SUB) {
                        operationList.push(op)
                        operationList.push(token)
                        break
                    }else {
                        operationList.push(op)
                        operationList.push(token)
                        break
                    }

                }

                break
            }
            case type.TYPE_OPERATION_MUL: {

            }
            case type.TYPE_OPERATION_DIV: {
                operationList.push(token)
                console.log(numberList, operationList)

                break
            }
            default: {
                throw `unknow type: ${token.type}`
            }
        }
    }

    let op
    let num1 = 0
    let num2 = 0
    operationList=operationList.reverse()
    numberList=numberList.reverse()
    while (operationList.length) {
        op = operationList.pop()
        num1 = numberList.pop()
        num2 = numberList.pop()
        numberList.push(calOnce( num2,num1, op))
        console.log(numberList, operationList)
    }
    return numberList[0]
}


module.exports = calculate