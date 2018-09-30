const type = require('./../src/type').type
const syntaxCheck = require('./../src/syntaxAnalyzer').syntaxCheck


function lexicalAnalyzer(input) {
    input = input.split('').reverse()
    var ast = []

    var preValue = ''
    var preType = type.TYPE_EMPTY

    var bracketNum = 0

    while (input.length) {
        let morpheme = input.pop()
        switch (morpheme) {
            case '.': {
            }
            case '0': {
            }
            case '1': {
            }
            case '2': {
            }
            case '3': {
            }
            case '4': {
            }
            case '5': {
            }
            case '6': {
            }
            case '7': {
            }
            case '8': {
            }
            case '9': {
                switch (preType) {
                    case type.TYPE_NUMBER: {
                        {
                            syntaxCheck(preType, type.TYPE_NUMBER)
                        }
                        preValue += morpheme
                        break
                    }
                    // 第一次
                    case type.TYPE_EMPTY: {
                        preValue = morpheme
                        preType = type.TYPE_NUMBER
                        break
                    }
                    default: {
                        ast.push({
                            type: preType,
                            value: preValue
                        })
                        preValue = morpheme
                        preType = type.TYPE_NUMBER

                    }
                }

                break
            }
            case '+': {
            }
            case '-': {
            }
            case '*': {
            }
            case '/': {
                {
                    syntaxCheck(preType, type.TYPE_OPERATION)
                }
                ast.push({
                    type: preType,
                    value: preType === type.TYPE_NUMBER ? +preValue : preValue
                })
                preType = type.TYPE_OPERATION
                preValue = morpheme
                break
            }
            case '(': {

                {
                    syntaxCheck(preType, type.TYPE_LEFT_BRACKET)
                }
                if (preType !== type.TYPE_EMPTY) {
                    ast.push({
                        type: preType,
                        value: preType === type.TYPE_NUMBER ? +preValue : preValue
                    })
                }

                preType = type.TYPE_LEFT_BRACKET
                preValue = morpheme
                {
                    ++bracketNum
                }
                break
            }
            case ')': {
                {
                    syntaxCheck(preType, type.TYPE_RIGHT_BRACKET)
                }
                {
                    --bracketNum
                    if (bracketNum < 0) {
                        throw `syntax error: num of ')' could no more than '('`
                    }
                }

                if (preType !== type.TYPE_EMPTY) {
                    ast.push({
                        type: preType,
                        value: preType === type.TYPE_NUMBER ? +preValue : preValue
                    })
                }


                preType = type.TYPE_RIGHT_BRACKET
                preValue = morpheme
                break
            }
            default: {
                throw "not allow morpheme:" + morpheme
            }
        }
    }

    ast.push({
        type: preType,
        value: preType === type.TYPE_NUMBER ? +preValue : preValue
    })

    return ast
}

module.exports = {
    lexicalAnalyzer
}