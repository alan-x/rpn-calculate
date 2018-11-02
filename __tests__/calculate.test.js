const tokenize = require('./../src/tokenize')
const calculate = require('./../src/calculate')

describe('calculate', () => {
    test('1+1=2', () => {
        let tokens = tokenize(`1+1`)
        expect(calculate(tokens)).toBe(2)
    })
    test('2-1=1', () => {
        let tokens = tokenize(`2-1`)
        expect(calculate(tokens)).toBe(1)
    })
    test('1-2=-1', () => {
        let tokens = tokenize(`1-2`)
        expect(calculate(tokens)).toBe(-1)
    })
    test('1*2=2', () => {
        let tokens = tokenize(`1*2`)
        expect(calculate(tokens)).toBe(2)
    })
    test('2/1=1', () => {
        let tokens = tokenize(`2/1`)
        expect(calculate(tokens)).toBe(2)
    })

    test('1+2-3+4-5=-1', () => {
        let tokens = tokenize(`1+2-3+4-5`)
        expect(calculate(tokens)).toBe(-1)
    })

    test('3*3/3 =3',()=>{
        let tokens = tokenize(`3*3/3`)
        expect(calculate(tokens)).toBe(3)
    })

    test('(1+2)*3', () => {
        let tokens = tokenize(`(1+2)*3`)
        expect(calculate(tokens)).toBe(9)
    })
    test('((1+2)*3+4)*5', () => {
        let tokens = tokenize(`((1+2)*3+4)*5`)
        expect(calculate(tokens)).toBe(65)
    })

    test('(1+2)*(3+4) =21', () => {
        let tokens = tokenize(`(1+2)*(3+4)`)
        expect(calculate(tokens)).toBe(21)
    })

})
