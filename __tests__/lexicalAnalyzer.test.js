const analyzer = require('./../src/lexicalanalyzer').lexicalAnalyzer
describe('lexical analyze', () => {
    test('11+22', () => {
        expect(analyzer('11+22')).toEqual([
            {
                type: 'number',
                value: 11
            },
            {
                type: 'operation',
                value: '+'
            },
            {
                type: 'number',
                value: 22
            }
        ])
    })

    test('(11+22)*(22+33)', () => {
        expect(analyzer('(11+22)*(22+33)')).toEqual([{"type": "(", "value": "("}, {
                "type": "number",
                "value": 11
            }, {"type": "operation", "value": "+"}, {"type": "number", "value": 22}, {
                "type": ")",
                "value": ")"
            }, {"type": "operation", "value": "*"}, {"type": "(", "value": "("}, {
                "type": "number",
                "value": 22
            }, {"type": "operation", "value": "+"}, {"type": "number", "value": 33}, {
                "type": ")",
                "value": ")"
            }]
        )
    })

    test('()', () => {
        try{
            analyzer('()')
        }catch (e) {
            expect(e).toBe(`syntax error: '(' -> ')'`)

        }
    })

})