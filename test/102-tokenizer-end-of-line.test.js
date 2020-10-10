'use strict'

const { strictEqual, deepStrictEqual } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../src/tokenizer.js')

describe('tokenizer end of line', () => {
	describe('tokenizer.tokenize()', () => {
		it('nl', () => {
			const tokens = tokenize('\n')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'eol')
			strictEqual(actual.value,  '\n')
		})

		it('nlcr', () => {
			const tokens = tokenize('\n\r')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'eol')
			strictEqual(actual.value,  '\n\r')
		})

		it('nlcr nlcr nlcr', () => {
			const tokens = tokenize('\n\r\n\r\n\r')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'eol')
			strictEqual(actual.value,  '\n\r\n\r\n\r')
		})

		it('nl nl a', () => {
			const tokens = tokenize('\n\na')
			const actual = tokens[1]
			strictEqual(tokens.length, 2)
			strictEqual(actual.line,   2)
			strictEqual(actual.column, 0)
			strictEqual(actual.value,  'a')
		})
	})
})

