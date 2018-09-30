type = {
    TYPE_EMPTY: '',
    TYPE_NUMBER: 'number',
    TYPE_OPERATION: 'operation',
    TYPE_LEFT_BRACKET: '(',
    TYPE_RIGHT_BRACKET: ')',
    TYPE_OPERATION_ADD: '+',
    TYPE_OPERATION_SUB: '-',
    TYPE_OPERATION_MUL: '*',
    TYPE_OPERATION_DIV: '/',
}

function getType(token) {
    if (token.match(/[0-9|\.]/g)) return type.TYPE_NUMBER
    if (token.match(/[\+\-\*\/]/g)) return type.TYPE_OPERATION
    if (token.match(/\(/)) return type.TYPE_LEFT_BRACKET
    if (token.match(/\)/)) return type.TYPE_RIGHT_BRACKET
    throw "not found this type: " + token
}

module.exports = {
    type,
    getType
}


