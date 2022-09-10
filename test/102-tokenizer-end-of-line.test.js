'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../index.js')

describe('tokenizer end of line', () => {
	describe('tokenizer.tokenize()', () => {
		it('NL', () => {
			const tokens = tokenize('\n')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'eol')
			strictEqual(actual.value,  '\n')
		})

		it('CRNL', () => {
			const tokens = tokenize('\r\n')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'eol')
			strictEqual(actual.value,  '\r\n')
		})

		it('CRNL CRNL CRNL', () => {
			const tokens = tokenize('\r\n\r\n\r\n')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'eol')
			strictEqual(actual.value,  '\r\n\r\n\r\n')
		})

		it('Nl NL a', () => {
			const tokens = tokenize('\n\na')
			const actual = tokens[1]
			strictEqual(tokens.length, 2)
			strictEqual(actual.line,   2)
			strictEqual(actual.column, 0)
			strictEqual(actual.value,  'a')
		})
	})
})
