const tokenize = require('./../src/tokenize')
const syntaxAnalyze = require('./../src/syntaxAnalyze')

describe('syntaxAnalyze', () => {
    test('1', () => {
        let tokens = tokenize(`1`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })
    test('(', () => {
        let tokens = tokenize(`(`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })
    test('+', () => {
        let tokens = tokenize(`+`)
        expect(syntaxAnalyze(tokens)).toBe(false)
    })
    test('-', () => {
        let tokens = tokenize(`-`)
        expect(syntaxAnalyze(tokens)).toBe(false)
    })
    test('*', () => {
        let tokens = tokenize(`*`)
        expect(syntaxAnalyze(tokens)).toBe(false)
    })
    test('/', () => {
        let tokens = tokenize(`/`)
        expect(syntaxAnalyze(tokens)).toBe(false)
    })

    test('1+1', () => {
        let tokens = tokenize(`1+1`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })
    test('(1+1)', () => {
        let tokens = tokenize(`(1+1)`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })
    test('(1+1', () => {
        let tokens = tokenize(`(1+1`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })

    test('(1+1 full', () => {
        let tokens = tokenize(`(1+1`)
        expect(syntaxAnalyze(tokens,true)).toBe(true)
    })

    test('(1++)', () => {
        let tokens = tokenize(`(1++)`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })

})
