'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../src/tokenizer.js')

describe('tokenizer comment', () => {
	describe('tokenizer.tokenize()', () => {
		it('//', () => {
			const tokens = tokenize('//')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'comment')
			strictEqual(actual.value,  '')
		})

		it(' //', () => {
			const tokens = tokenize(' //')
			const actual = tokens[1]
			strictEqual(tokens.length, 2)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 1)
			strictEqual(actual.type,   'comment')
			strictEqual(actual.value,  '')
		})

		it('//a', () => {
			const tokens = tokenize('//a')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'comment')
			strictEqual(actual.value,  'a')
		})

		it('  //a', () => {
			const tokens = tokenize('  //a')
			const actual = tokens[1]
			strictEqual(tokens.length, 2)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 2)
			strictEqual(actual.type,   'comment')
			strictEqual(actual.value,  'a')
		})

		it('//aa', () => {
			const tokens = tokenize('//aa')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'comment')
			strictEqual(actual.value,  'aa')
		})

		it(' //aaNL  //bbbNLCR    //cccc', () => {
			const tokens = tokenize(' //aa\n  //bbb\n\r    //cccc')
			strictEqual(tokens.length, 8)
			strictEqual(tokens[1].column, 1)
			strictEqual(tokens[1].value, 'aa')
			strictEqual(tokens[4].line, 1)
			strictEqual(tokens[4].column, 2)
			strictEqual(tokens[4].value, 'bbb')
			strictEqual(tokens[7].line, 2)
			strictEqual(tokens[7].column, 4)
			strictEqual(tokens[7].value, 'cccc')
		})
	})
})

