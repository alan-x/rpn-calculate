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
        try {
            syntaxAnalyze(tokens)
        } catch (e) {
            expect(e).toBe(`syntax error: could not begin with +`)
        }
    })
    test('-', () => {
        let tokens = tokenize(`-`)
        try {
            syntaxAnalyze(tokens)
        } catch (e) {
            expect(e).toBe(`syntax error: could not begin with -`)
        }
    })
    test('*', () => {
        let tokens = tokenize(`*`)
        try {
            syntaxAnalyze(tokens)
        } catch (e) {
            expect(e).toBe(`syntax error: could not begin with *`)
        }
    })
    test('/', () => {
        let tokens = tokenize(`/`)
        try {
            syntaxAnalyze(tokens)
        } catch (e) {
            expect(e).toBe(`syntax error: could not begin with /`)
        }
    })

    test('1+1', () => {
        let tokens = tokenize(`1+1`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })
    test('(1+1)', () => {
        let tokens = tokenize(`(1+1)`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })
    test('(1+1)*', () => {
        let tokens = tokenize(`(1+1)*`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })
    test('(1+1)*(', () => {
        let tokens = tokenize(`(1+1)*(`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })
    test('(1+1', () => {
        let tokens = tokenize(`(1+1`)
        expect(syntaxAnalyze(tokens)).toBe(true)
    })

    test('(1+1 full', () => {
        let tokens = tokenize(`(1+1`)
        try {
            syntaxAnalyze(tokens)
        } catch (e) {
            expect(e).toBe(`syntax error: could not begin with +`)
        }
    })

    test('(1++)', () => {
        let tokens = tokenize(`(1++)`)
        try {
            syntaxAnalyze(tokens)
        } catch (e) {
            expect(e).toBe(`syntax error: + -> +`)
        }
    })

})
