波兰计算器
---
> 用[逆波兰表达式](https://zh.m.wikipedia.org/wiki/%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)实现的计算器
### 版本
- v1.0.0 这个版本不推荐用, 在逆波兰计算上有错误, 并且在词素化的环节使用的方式对维护不友好
- v2.0.0 与 v1.0.0 不兼容, 完全重写的代码和重新设计的 api, 将整个分析过程规范化: `词法分析`->`语法分析`->`转化RPN`->`计算结果`

### 功能
- 任意顺序的四则`+-*/`运算
- 支持`()`
- 前端后端通用
- 提供直接计算函数
- 提供四则运算表达式转逆波兰`AST`函数
- 提供语法分析函数(暂时只支持上下两个字符判定)

### 问题
- ~~暂未支持语法分析, 也就是输入错误格式的表达式也不会报错, 下一个版本将会引入~~
- ~~已经引入词法分析, 使用向下递归解析, 但是只支持上下两个字符之间判定, 而无法全文判定, 主要是左右括号的匹配~~
- 使用`引用计数`修复括号匹配的问题, 前后字符词法分析, 已经解决了括号问题了

### 脚本

- 测试: `npm run test`
- 打包: `npm run build`

### 安装
```bash
npm install --save @followwinter/rpn-calculate
``` 
### 使用
```
// 计算
rpn.calculateText(`1+2`) // 3

// 语法检测
rpn.syntaxAnalyzeText(`1+2`) // true
rpn.syntaxAnalyzeText(`)))`) // syntax error: ....

// 中缀转后缀
rpn.parseText(`1+2`) // [{"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_OPERATION_ADD","value": "+"}]

```

### `api`介绍
> 所有以`Text`结尾的`api`都是直接封装了中间环节的
- `rpn.calculateText(text:String):Number`: 根据输入的表达式字符串计算结果
    ```javascript
    rpn.calculateText(`1+1`) // 2
    ```
- `rpn.parseText(text:String):List<RpnASTNode>`: 根据输入的表达式字符串转化成后缀表达式`AST`
    ```javascript
    rpn.parseText(`1+1`) // [{"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_NUMBER", "value": 1}, {"type": "TYPE_OPERATION_ADD","value": "+"}]
    ```
- `rpn.syntaxAnalyzeText(text:String):true|throw error`: 根据输入的表达式字符串检测语法是否正确
    ```javascript
    rpn.syntaxAnalyzeText(`1+1`) // true
    ```

### 效果
 ![rpn](https://github.com/followWinter/rpn-calculate/raw/master/res/rpn.jpg)

