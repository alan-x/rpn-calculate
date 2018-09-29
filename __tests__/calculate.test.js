const calculate = require('./../src/calculate').calculate
const directCalculate = require('./../src/calculate').directCalculate

describe('calculate', () => {
    test('calculate [{type: \'number\', value: 1}, {type: \'number\', value: 2}, {type: \'operation\', value: \'+\'}] to 3', () => {
        expect(calculate([{type: 'number', value: 1}, {type: 'number', value: 2}, {
            type: 'operation',
            value: '+'
        }])).toBe(3)
    })

    test('calculate [{type: \'number\', value: 1}, {type: \'number\', value: 2}, {type: \'operation\', value: \'-\'}] to -1', () => {
        expect(calculate([{type: 'number', value: 1}, {type: 'number', value: 2}, {
            type: 'operation',
            value: '-'
        }])).toBe(-1)
    })
})

describe('direct calculate', () => {

    test('direct calculate 1+2 to 3', () => {
        expect(directCalculate('1+2')).toBe(3)
    })

    test('direct calculate 1-2 to -1', () => {
        expect(directCalculate('1-2')).toBe(-1)
    })
    test('direct calculate 1*2 to 2', () => {
        expect(directCalculate('1*2')).toBe(2)
    })
    test('direct calculate 2/1 to 2', () => {
        expect(directCalculate('2/1')).toBe(2)
    })
    test('direct calculate (1+2)*(3+4) to 21', () => {
        expect(directCalculate('(1+2)*(3+4)')).toBe(21)
    })
})