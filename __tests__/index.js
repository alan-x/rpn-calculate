const rpn = require('./../index')

describe('index', () => {
    test('analyzeText', () => {
        expect(rpn.syntaxAnalyzeText(`1+1`)).toBe(true)
    })
    test('parseText', () => {
        expect(rpn.parseText(`1+1`)).toEqual(
            [{"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_NUMBER", "value": 1}, {
                "type": "TYPE_OPERATION_ADD",
                "value": "+"
            }]
        )
    })
    test('calculateText', () => {
        expect(rpn.calculateText(`1+1`)).toBe(2)
    })
})