波兰计算器
---
> 用[逆波兰表达式](https://zh.m.wikipedia.org/wiki/%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)实现的计算器

### 功能
- 任意顺序的四则`+-*/`运算
- 支持`()`
- 前端后端通用
- 提供直接计算函数
- 提供四则运算表达式转逆波兰`AST`函数
- 提供语法分析函数(暂时只支持上下两个字符判定)

### 问题
~~暂未支持语法分析, 也就是输入错误格式的表达式也不会报错, 下一个版本将会引入~~
已经引入词法分析, 使用向下递归解析, 但是只支持上下两个字符之间判定, 而无法全文判定, 主要是左右括号的匹配

### 脚本

- 测试: `npm run test`
- 打包: `npm run build`

### 使用
```
// 计算
const directCalculate = require('./../src/calculate').directCalculate

directCalculate('1+2') // 3
directCalculate('(1+2)*(3+4)') // 21

const syntaxCheckWithText = require('./../src/syntaxanalyzer').syntaxCheckWithText

// 语法分析
try{
    syntaxCheckWithText('1+1')  
}catch (e) {
    console.log(e)  // 不会报错
}

try {
    syntaxCheckWithText(')(') 
} catch (e) {
    console.log(e)  // syntax error: '' -> ')' 语法错误, 不能以 ')'
}
```

### `api`介绍
- `parse`: 转化
    - `parse(input:String):Array<RPNObject>`: 根据一个四则运算表达式字符串解析出逆波兰`AST`栈
        ```javascript
        parse('1+2') // [{type:'number',value:1},{type:'number',value:2},{type:'operation',value:'+'}]
        ```
- `calculate`: 计算
    - `calculate(rpn:RPNObject):Number`: 根据一个逆波兰表达式计算出结果
        ```javascript
          calculate([{type:'number',value:1},{type:'number',value:2},{type:'operation',value:'+'}]) //3
        ```
    - `directCalculate(input:String):Number`: [核心函数]直接计算结果, 根据一个四则运算表达式字符串计算出结果
        ```javascript
            calculate('1+2') //3
        ```
- `syntaxAnalyzer`: 语法分析
    - `syntaxCheckWithText(text:String)`: [核心函数]语法分析, 根据一个四则运算表达式字符串判断语法是否正确
    ```javascript
        try {
            syntaxCheckWithText(')(') 
        } catch (e) {
            console.log(e)  // syntax error: '' -> ')'  解释: 语法错误, 不能以 ')' 开始
        }
    ```
- `lexicalAnalyzer`: 词法分析
    - `lexicalAnalyzer(input:String)`: 词法分析, 根据一个四则运算表达式字符串分析出词法数, 为解析`AST`做准备
    ```javascript
    lexicalAnalyzer('11+22') // [{type:'number',value:11},{type:'operation',value:'+'},{type:'number',value:22}]
    ```
### 效果
 ![rpn](https://github.com/followWinter/rpn-calculate/raw/master/res/rpn.jpg)

