'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../src/tokenizer.js')

describe('tokenizer number', () => {
	describe('tokenizer.tokenize()', () => {
		it('9', () => {
			const tokens = tokenize('9')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'number')
			strictEqual(actual.value,  '9')
		})

		it('  42', () => {
			const tokens = tokenize('  42')
			const actual = tokens[1]
			strictEqual(tokens.length, 2)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 2)
			strictEqual(actual.type,   'number')
			strictEqual(actual.value,  '42')
		})

		it(' 3  3.14  NL9.98//xx', () => {
			const tokens = tokenize(' 3  3.14  \n9.98//xx')
			strictEqual(tokens.length, 8)
			strictEqual(tokens[1].column, 1)
			strictEqual(tokens[1].value, '3')
			strictEqual(tokens[3].column, 4)
			strictEqual(tokens[3].value, '3.14')
			strictEqual(tokens[6].column, 0)
			strictEqual(tokens[6].value, '9.98')
		})
	})
})

