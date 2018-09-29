const type = require('./type')


function sliceToArr(input) {
    return input.match(/([0-9|\.]+)|([\+\-\*\/])|(\()|(\))/g).reverse()
}


function getType(token) {
    if (token.match(/[0-9|\.]/g)) return type.TYPE_NUMBER
    if (token.match(/[\+\-\*\/]/g)) return type.TYPE_OPERATION
    if (token.match(/\(/)) return type.TYPE_LEFT_BRACKET
    if (token.match(/\)/)) return type.TYPE_RIGHT_BRACKET
    throw "not found this type: " + token
}


function tokenizer(input) {
    var tokenList = sliceToArr(input)
    var newTokenList = []

    tokenList.forEach((token) => {
        var type = getType(token)
        newTokenList.push({
            type: type,
            value: isNaN(+token)?token:+token
        })
    })

    return newTokenList
}

function parse(input) {
    var result = []
    var operation = []

    var tokenList = tokenizer(input)

    while (tokenList.length) {
        let token = tokenList.pop()
        switch (token.type) {
            case type.TYPE_NUMBER: {
                result.push(token)
                break
            }
            case type.TYPE_OPERATION: {
                operation.push(token)
                break
            }
            case type.TYPE_LEFT_BRACKET: {
                operation.push(token)
                break
            }
            case type.TYPE_RIGHT_BRACKET: {
                var op = operation.pop()
                while (op.value !== '(') {
                    result.push(op)
                    op = operation.pop()
                }
                break
            }
            default: {
                throw "not found this type" + token.type
            }
        }

    }

    while (operation.length) {
        result.push(operation.pop())
    }
    return result
}


module.exports = {
    parse,
    getType,
    tokenizer
}
