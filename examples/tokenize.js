'use strict'

const { tokenize } = require('../index.js')

const sourceCode = `#include <stdio.h>

int main()
{
    printf("Hello, World!\n");
}
`
const output = tokenize(sourceCode)
	.map( t => '  ' + JSON.stringify(t) + ",")
	.join('\n')

console.log('[\n' + output + '\n]')
