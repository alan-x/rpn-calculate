const p = require('./../src/parse')
const parse = p.parse
const getType = p.getType
const tokenizer = p.tokenizer


describe('parse', () => {
    test('parse 1+2 to [{"type": "number", "value": 2}, {"type": "number", "value": 1}, {"type": "operation", "value": "+"}]', () => {
        let result = parse('1+2')
        expect(result).toEqual([{"type": "number", "value": 1}, {"type": "number", "value": 2}, {
            "type": "operation",
            "value": "+"
        }])
    })

    test('parse 1+2.1 to [{"type": "number", "value": 2.1}, {"type": "number", "value": 1}, {"type": "operation", "value": "+"}]', () => {
        let result = parse('1+2.1')
        expect(result).toEqual([{"type": "number", "value": 1}, {"type": "number", "value": 2.1}, {
            "type": "operation",
            "value": "+"
        }])
    })

    test('parse 1+2*3 to [{"type": "number", "value": 3}, {"type": "number", "value": 2}, {"type": "number", "value": 1}, {"type": "operation", "value": "+"}, {"type": "operation", "value": "*"}]', () => {
        expect(parse('1+2*3')).toEqual([{"type": "number", "value": 1}, {"type": "number", "value": 2}, {
            "type": "number",
            "value": 3
        }, {"type": "operation", "value": "*"}, {"type": "operation", "value": "+"}])
    })

    test('parse (1+2)*(3+4) to ["1","2","+","3","4","+","*"]', () => {
        expect(parse('(1+2)*(3+4)')).toEqual([{"type": "number", "value": 1}, {
            "type": "number",
            "value": 2
        }, {"type": "operation", "value": "+"}, {"type": "number", "value": 3}, {
            "type": "number",
            "value": 4
        }, {"type": "operation", "value": "+"}, {"type": "operation", "value": "*"}])
    })
})


