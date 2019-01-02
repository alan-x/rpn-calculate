describe('normal', () => {
    test('测试没有优先级下的计算', () => {

        let calc = (input) => {
            let calMap = {
                '+': (num1, num2) => num1 + num2,
                '-': (num1, num2) => num1 - num2,
                '*': (num1, num2) => num1 * num2,
                '/': (num1, num2) => num1 / num2,
            }
            input = [...input].reverse()
            while (input.length >= 2) {
                let num1 = +input.pop()
                let op = input.pop()
                let num2 = +input.pop()
                input.push(calMap[op](num1, num2))
            }
            return input[0]
        }

        expect(calc('1+2+3+4+5-1')).toEqual(14)
        expect(calc('1*2*3/3')).toEqual(2)
    })

    test('测试逆波兰式计算', () => {

        let calc = (input) => {
            let calMap = {
                '+': (num1, num2) => num1 + num2,
                '-': (num1, num2) => num1 - num2,
                '*': (num1, num2) => num1 * num2,
                '/': (num1, num2) => num1 / num2,
            }
            input = [...input].reverse()
            let resultStack = []
            while (input.length) {
                let token = input.pop()
                if (/[0-9]/.test(token)) {
                    resultStack.push(token)
                    continue
                }
                if (/[+\-*/]/.test(token)) {
                    let num1 = +resultStack.pop()
                    let num2 = +resultStack.pop()
                    resultStack.push(calMap[token](num1, num2))
                    continue
                }
            }
            return resultStack[0]
        }

        expect(calc('123*+')).toEqual(7)
    })


    test('测试中缀转后缀', () => {

        let parse = (input) => {
            input = [...input].reverse()
            let resultStack = [], opStack = []
            while (input.length) {
                let token = input.pop()
                if (/[0-9]/.test(token)) {
                    resultStack.push(token)
                    continue
                }
                if (/[*/]/.test(token)) {
                    while (opStack.length) {
                        let preOp = opStack.pop()
                        if (/[+\-]/.test(preOp)) {
                            opStack.push(preOp)
                            opStack.push(token)
                            token = null
                            break
                        } else {
                            resultStack.push(preOp)
                            continue
                        }
                    }
                    token && opStack.push(token)
                    continue
                }
                if (/[+\-]/.test(token)) {
                    while (opStack.length) {
                        let op = opStack.pop()
                        if (/\(/.test(op)) {
                            opStack.push(op)
                            break
                        }
                        resultStack.push(op)
                    }
                    opStack.push(token)
                    continue
                }
                if (/\(/.test(token)) {
                    opStack.push(token)
                    continue
                }
                if (/\)/.test(token)) {
                    let preOp = opStack.pop()
                    while (preOp !== '(' && opStack.length) {
                        resultStack.push(preOp)
                        preOp = opStack.pop()
                    }
                    continue
                }
            }
            return [...resultStack, ...opStack.reverse()].join('')
        }

        expect(parse(`1+2-3+4-5`)).toEqual('12+3-4+5-')
        expect(parse(`1+2*3`)).toEqual('123*+')
        expect(parse(`(1+2)*(3+4)`)).toEqual('12+34+*')

    })

    test('测试整个流程', () => {
        let parse = require('./../simple/simple').parse
        let calc = require('./../simple/simple').calc

        expect(calc(parse(`1+2`))).toEqual(3)
        expect(calc(parse(`(1+2)*(3+4`))).toEqual(21)
    })

})
