'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../src/tokenizer.js')

describe('tokenizer character', () => {
	describe('tokenizer.tokenize()', () => {
		it('char: a', () => {
			const tokens = tokenize("'a'")
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'character')
			strictEqual(actual.value,  'a')
		})

		it('char: NL', () => {
			const tokens = tokenize("'\n'")
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'character')
			strictEqual(actual.value,  '\n')
		})

		it('char: hex', () => {
			const tokens = tokenize("'\xAE'")
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'character')
			strictEqual(actual.value,  '\xAE')
		})
	})
})
