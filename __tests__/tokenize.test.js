const tokenize = require('./../src/tokenize')

describe('tokenize', () => {
    test('11 -> number', () => {
        expect(tokenize(`11`)).toEqual([{"type": "TYPE_NUMBER", "value": 11}])
    })
    test('( -> (', () => {
        expect(tokenize(`(`)).toEqual([{"type": "TYPE_LEFT_BRACKET", "value": "("}])
    })
    test(') -> )', () => {
        expect(tokenize(`)`)).toEqual([{"type": "TYPE_RIGHT_BRACKET", "value": ")"}])
    })
    test('+ -> +', () => {
        expect(tokenize(`+`)).toEqual([{"type": "TYPE_OPERATION_ADD", "value": "+"}])
    })
    test('- -> -', () => {
        expect(tokenize(`-`)).toEqual([{"type": "TYPE_OPERATION_SUB", "value": "-"}])
    })
    test('* -> *', () => {
        expect(tokenize(`*`)).toEqual([{"type": "TYPE_OPERATION_MUL", "value": "*"}])
    })
    test('/ -> /', () => {
        expect(tokenize(`/`)).toEqual([{"type": "TYPE_OPERATION_DIV", "value": "/"}])
    })

    test('a -> a', () => {
        try {
            tokenize(`a`)
        } catch (e) {
            expect(e).toEqual('error input: a')
        }
    })

    test('(1+2)*3/4', () => {
        expect(tokenize(`(1+2)*3/4`)).toEqual(
            [{"type": "TYPE_LEFT_BRACKET", "value": "("}, {
                "type": "TYPE_NUMBER",
                "value": 1
            }, {"type": "TYPE_OPERATION_ADD", "value": "+"}, {
                "type": "TYPE_NUMBER",
                "value": 2
            }, {"type": "TYPE_RIGHT_BRACKET", "value": ")"}, {
                "type": "TYPE_OPERATION_MUL",
                "value": "*"
            }, {"type": "TYPE_NUMBER", "value": 3}, {
                "type": "TYPE_OPERATION_DIV",
                "value": "/"
            }, {"type": "TYPE_NUMBER", "value": 4}]
        )
    })
})