const tokenize = require('./../src/tokenize')
const parse = require('./../src/parse')

describe('parse', () => {
    test('1+2 => 1,2,+', () => {
        let tokens = tokenize(`1+2`)
        expect(parse(tokens)).toEqual(
            [{"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_NUMBER", "value": 2}, {
                "type": "TYPE_OPERATION_ADD",
                "value": "+"
            }]
        )
    })
    test('1+2*3 = 1,2,3,*,+', () => {
        let tokens = tokenize(`1+2*3`)
        expect(parse(tokens)).toEqual(
            [{"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_NUMBER", "value": 2}, {
                "type": "TYPE_NUMBER",
                "value": 3
            }, {"type": "TYPE_OPERATION_MUL", "value": "*"}, {"type": "TYPE_OPERATION_ADD", "value": "+"}]
        )
    })
    test('1+2-3+4-5 = 1,2,+,3,-,4+,5-', () => {
        let tokens = tokenize(`1+2-3+4-5`)
        expect(parse(tokens)).toEqual(
            [{"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_NUMBER", "value": 2}, {
                "type": "TYPE_OPERATION_ADD",
                "value": "+"
            }, {"type": "TYPE_NUMBER", "value": 3}, {
                "type": "TYPE_OPERATION_SUB",
                "value": "-"
            }, {"type": "TYPE_NUMBER", "value": 4}, {
                "type": "TYPE_OPERATION_ADD",
                "value": "+"
            }, {"type": "TYPE_NUMBER", "value": 5}, {"type": "TYPE_OPERATION_SUB", "value": "-"}]
        )
    })
    test('(1+2)*3 = 1,2,+,3,*', () => {
        let tokens = tokenize(`(1+2)*3`)
        expect(parse(tokens)).toEqual(
            [{"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_NUMBER", "value": 2}, {
                "type": "TYPE_OPERATION_ADD",
                "value": "+"
            }, {"type": "TYPE_NUMBER", "value": 3}, {"type": "TYPE_OPERATION_MUL", "value": "*"}]
        )
    })
    test('(1+2)*(3+4) = 1,2,+,3,4,+,*', () => {
        let tokens = tokenize(`(1+2)*(3+4)`)
        expect(parse(tokens)).toEqual(
            [{"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_NUMBER", "value": 2}, {
                "type": "TYPE_OPERATION_ADD",
                "value": "+"
            }, {"type": "TYPE_NUMBER", "value": 3}, {"type": "TYPE_NUMBER", "value": 4}, {
                "type": "TYPE_OPERATION_ADD",
                "value": "+"
            }, {"type": "TYPE_OPERATION_MUL", "value": "*"}]
        )
    })
})
