波兰计算器
---
> 用[逆波兰表达式](https://zh.m.wikipedia.org/wiki/%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)实现的计算器

### 功能
- 四则`+-*/`运算
- 前端后端通用
- 提供直接计算函数
- 提供四则运算表达式转逆波兰`AST`树函数

### 问题
暂未支持语法分析, 也就是输入错误格式的表达式也不会报错, 下一个版本将会引入

### 脚本

- 测试: `npm run test`
- 打包: `npm run build`

### 使用
```
const directCalculate = require('./../src/calculate').directCalculate

directCalculate('1+2') // 3
directCalculate('(1+2)*(3+4)') // 21
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
    - `directCalculate(input:String):Number`: 核心函数, 根据一个四则运算表达式字符串计算出结果
        ```javascript
            calculate('1+2') //3
        ```
### 效果
 ![rpn](https://github.com/followWinter/rpn-calculate/raw/master/res/rpn.jpg)

