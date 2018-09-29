var parse = require('./../src/parse').parse
const type = require('./type')

function calculate(rpn) {
    var result = []
    var a
    var b

    rpn = rpn.reverse()

    while (rpn.length) {
        var token = rpn.pop()
        switch (token.type) {
            case type.TYPE_NUMBER: {
                result.push(token.value)
                break
            }
            case type.TYPE_OPERATION: {
                a = +result.pop()
                b = +result.pop()
                switch (token.value) {
                    case type.TYPE_OPERATION_ADD: {
                        result.push(b + a)
                        break
                    }
                    case type.TYPE_OPERATION_SUB: {
                        result.push(b - a)
                        break
                    }
                    case type.TYPE_OPERATION_MUL: {
                        result.push(b * a)
                        break
                    }
                    case type.TYPE_OPERATION_DIV: {
                        result.push(b / a)
                        break
                    }
                    default: {
                        throw 'not found this type of operation:' + token
                    }
                }
            }
        }
    }
    return result[0]
}

function directCalculate(input) {
    return calculate(parse(input))
}

module.exports = {
    calculate,
    directCalculate
}