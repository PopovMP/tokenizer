'use strict'

const { tokenize } = require('../index.js')

const sourceCode = `#include <stdio.h>

int main()
{
    // Prints: Hello, World!
    printf("Hello, World!\\n");

    // Prints: The answer is: 42
    printf("The answer is: %d\\n", 42);
}
`
const output = tokenize(sourceCode)
	.map( t => '  ' + JSON.stringify(t) + ",")
	.join('\n')

console.log('[\n' + output + '\n]')
