const syntaxAnalyzer = require('./../src/syntaxanalyzer').syntaxAnalyzer
const syntaxCheck = require('./../src/syntaxanalyzer').syntaxCheck
const syntaxCheckWithText = require('./../src/syntaxanalyzer').syntaxCheckWithText
const type = require('./../src/type').type

describe('syntax', () => {
    test('1->1', () => {
        expect(syntaxAnalyzer(type.TYPE_NUMBER, type.TYPE_NUMBER)).toBeTruthy()
    })
    test('1->+', () => {
        expect(syntaxAnalyzer(type.TYPE_NUMBER, type.TYPE_OPERATION)).toBeTruthy()
    })
    test('1->)', () => {
        expect(syntaxAnalyzer(type.TYPE_NUMBER, type.TYPE_RIGHT_BRACKET)).toBeTruthy()
    })
    test('error 1->(', () => {
        expect(syntaxAnalyzer(type.TYPE_NUMBER, type.TYPE_LEFT_BRACKET)).toBeFalsy()

    })
    test('error 1->(', () => {
        expect(syntaxAnalyzer(type.TYPE_NUMBER, type.TYPE_LEFT_BRACKET)).toBeFalsy()

    })


    test('+ -> 1', () => {
        expect(syntaxAnalyzer(type.TYPE_OPERATION, type.TYPE_NUMBER)).toBeTruthy()
    })
    test('+ -> (', () => {
        expect(syntaxAnalyzer(type.TYPE_OPERATION, type.TYPE_LEFT_BRACKET)).toBeTruthy()
    })
    test('error + -> )', () => {
        expect(syntaxAnalyzer(type.TYPE_OPERATION, type.TYPE_RIGHT_BRACKET)).toBeFalsy()
    })


    test('(->1', () => {
        expect(syntaxAnalyzer(type.TYPE_LEFT_BRACKET, type.TYPE_NUMBER)).toBeTruthy()
    })
    test('(->+', () => {
        expect(syntaxAnalyzer(type.TYPE_LEFT_BRACKET, type.TYPE_OPERATION)).toBeFalsy()
    })


    test(')->+', () => {
        expect(syntaxAnalyzer(type.TYPE_RIGHT_BRACKET, type.TYPE_OPERATION)).toBeTruthy()
    })
    test(')->1', () => {
        expect(syntaxAnalyzer(type.TYPE_RIGHT_BRACKET, type.TYPE_NUMBER)).toBeFalsy()
    })


})

describe('syntax check', () => {
    test('1 -> (', () => {
        try {
            syntaxCheck(type.TYPE_NUMBER, type.TYPE_LEFT_BRACKET)
        } catch (e) {
            expect(e).toBe(`syntax error: 'number' -> '('`)
        }
    })
    test('1 -> 1', () => {
        expect(syntaxCheck(type.TYPE_NUMBER, type.TYPE_NUMBER)).toBeTruthy()
    })
    test('( -> )', () => {
        try {
            syntaxCheck(type.TYPE_LEFT_BRACKET, type.TYPE_RIGHT_BRACKET)
        } catch (e) {
            expect(e).toBe(`syntax error: '(' -> ')'`)
        }

    })
})

describe('syntax check wit text', () => {
    test('1+1', () => {
        expect(syntaxCheckWithText('1+1')).toBeTruthy()
    })
    test('(1+2)*(3+4)', () => {
        expect(syntaxCheckWithText('(1+2)*(3+4)')).toBeTruthy()
    })
    test('()', () => {

        try {
            syntaxCheckWithText('()')
        } catch (e) {
            expect(e).toBe(`syntax error: '(' -> ')'`)
        }
    })
    test(')-', () => {
        try {
            syntaxCheckWithText(')-')
        } catch (e) {
            expect(e).toBe(`syntax error: '' -> ')'`)
        }
    })
})

