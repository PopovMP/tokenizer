# Tokenizer of a C-like languages

A **Token** is a structure with the following properties:

```js
/**
 * @typedef {Object} Token
 *
 * @property {number} line
 * @property {number} column
 * @property {string} type - space, eol, comment, punctuation, operator, word, number, string, character
 * @property {string} value
 */
```

## Methods

```js
/**
 * Tokenizes source code
 *
 * @param {string} sourceCode
 *
 * @return {Token[]}
 */
function tokenize(sourceCode) { }


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
    // Prints: Hello, World!
    printf("Hello, World!\n");

    // Prints: The answer is: 42
    printf("The answer is: %d\n", 42);
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
  {"line":2,"column":0,"type":"word","value":"int"},
  {"line":2,"column":3,"type":"space","value":" "},
  {"line":2,"column":4,"type":"word","value":"main"},
  {"line":2,"column":8,"type":"punctuation","value":"("},
  {"line":2,"column":9,"type":"punctuation","value":")"},
  {"line":2,"column":10,"type":"eol","value":"\n"},
  {"line":3,"column":0,"type":"punctuation","value":"{"},
  {"line":3,"column":1,"type":"eol","value":"\n"},
  {"line":4,"column":0,"type":"space","value":"    "},
  {"line":4,"column":4,"type":"comment","value":" Prints: Hello, World!"},
  {"line":4,"column":4,"type":"eol","value":"\n"},
  {"line":5,"column":0,"type":"space","value":"    "},
  {"line":5,"column":4,"type":"word","value":"printf"},
  {"line":5,"column":10,"type":"punctuation","value":"("},
  {"line":5,"column":11,"type":"string","value":"Hello, World!\\n"},
  {"line":5,"column":28,"type":"punctuation","value":")"},
  {"line":5,"column":29,"type":"punctuation","value":";"},
  {"line":5,"column":30,"type":"eol","value":"\n\n"},
  {"line":7,"column":0,"type":"space","value":"    "},
  {"line":7,"column":4,"type":"comment","value":" Prints: The answer is: 42"},
  {"line":7,"column":4,"type":"eol","value":"\n"},
  {"line":8,"column":0,"type":"space","value":"    "},
  {"line":8,"column":4,"type":"word","value":"printf"},
  {"line":8,"column":10,"type":"punctuation","value":"("},
  {"line":8,"column":11,"type":"string","value":"The answer is: %d\\n"},
  {"line":8,"column":32,"type":"punctuation","value":","},
  {"line":8,"column":33,"type":"space","value":" "},
  {"line":8,"column":34,"type":"number","value":"42"},
  {"line":8,"column":36,"type":"punctuation","value":")"},
  {"line":8,"column":37,"type":"punctuation","value":";"},
  {"line":8,"column":38,"type":"eol","value":"\n"},
  {"line":9,"column":0,"type":"punctuation","value":"}"},
  {"line":9,"column":1,"type":"eol","value":"\n"}
]

```
