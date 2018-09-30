const getType = require('./../src/type').getType

describe('getType', () => {
    test('getType "1" to number', () => {
        expect(getType('1')).toEqual('number')
    })
    test('getType "+" to number', () => {
        expect(getType('+')).toEqual('operation')
    })
    test('getType "(" to left_bracket', () => {
        expect(getType('(')).toEqual('(')
    })
    test('getType ")" to right_bracket', () => {
        expect(getType(')')).toEqual(')')
    })
})