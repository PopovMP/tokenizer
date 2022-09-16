# Tokenizer of a C-like languages

A **Token** is a structure with the following properties:

```js
/**
 * @typedef {Object} Token
 *
 * @property {number}    line
 * @property {number}    column
 * @property {TokenType} type
 * @property {string}    value
 */
```

## Methods

```js
/**
 * @typedef {Object} TokenizerOptions
 *
 * @property {string[]} [keywords]
 * @property {string[]} [operators]
 * @property {string[]} [punctuations]
 */

/**
 * Tokenizes source code
 *
 * @param {string} sourceCode
 * @param {TokenizerOptions} options
 *
 * @return {Token[]}
 */
function tokenize(sourceCode, options) { }


/**
 * Stringifies tokens back to a source code
 *
 * @param {Token[]} tokens
 *
 * @return {string}
 */
function stringify(tokens) { }


/**
 * Removes meaningless tokens as: space, eol, comment
 *
 * @param {Token[]} tokens
 *
 * @return {Token[]}
 */
function clean(tokens) { }
```

## Examples

```c
#include <stdio.h>

int main()
{
    printf("Hello, World!\n");
}
```

```json
[
  {"line":0,"column":0,"type":"pragma","value":"include"},
  {"line":0,"column":0,"type":"space","value":" "},
  {"line":0,"column":1,"type":"operator","value":"<"},
  {"line":0,"column":2,"type":"word","value":"stdio"},
  {"line":0,"column":7,"type":"operator","value":"."},
  {"line":0,"column":8,"type":"word","value":"h"},
  {"line":0,"column":9,"type":"operator","value":">"},
  {"line":0,"column":10,"type":"eol","value":"\n\n"},
  {"line":2,"column":0,"type":"keyword","value":"int"},
  {"line":2,"column":3,"type":"space","value":" "},
  {"line":2,"column":4,"type":"word","value":"main"},
  {"line":2,"column":8,"type":"punctuation","value":"("},
  {"line":2,"column":9,"type":"punctuation","value":")"},
  {"line":2,"column":10,"type":"eol","value":"\n"},
  {"line":3,"column":0,"type":"punctuation","value":"{"},
  {"line":3,"column":1,"type":"eol","value":"\n"},
  {"line":4,"column":0,"type":"space","value":"    "},
  {"line":4,"column":4,"type":"word","value":"printf"},
  {"line":4,"column":10,"type":"punctuation","value":"("},
  {"line":4,"column":11,"type":"string","value":"Hello, World!\n"},
  {"line":4,"column":27,"type":"punctuation","value":")"},
  {"line":4,"column":28,"type":"punctuation","value":";"},
  {"line":4,"column":29,"type":"eol","value":"\n"}
]
```
