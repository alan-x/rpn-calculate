const type = require('./type').type
const lexicalAnalyzer = require('./lexicalAnalyzer').lexicalAnalyzer

function parse(input) {
    var result = []
    var operation = []

    var tokenList = lexicalAnalyzer(input).reverse()

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
    parse
}
