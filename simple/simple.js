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


module.exports = {
    calc, parse
}

