'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../index.js')

describe('tokenizer special symbols', () => {
	describe('tokenizer.tokenize()', () => {
		it('=', () => {
			const tokens = tokenize('=')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'operator')
			strictEqual(actual.value,  '=')
		})

		it(' ==', () => {
			const tokens = tokenize(' ==')
			const actual = tokens[1]
			strictEqual(tokens.length, 2)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 1)
			strictEqual(actual.type,   'operator')
			strictEqual(actual.value,  '==')
		})

		it(' > ) NL >=', () => {
			const tokens = tokenize(' > ) \n >=')
			strictEqual(tokens.length, 8)
			strictEqual(tokens[1].column,  1)
			strictEqual(tokens[1].value, '>')
			strictEqual(tokens[3].column,  3)
			strictEqual(tokens[3].type,  'punctuation')
			strictEqual(tokens[3].value, ')')
			strictEqual(tokens[7].line,    1)
			strictEqual(tokens[7].column,  1)
			strictEqual(tokens[7].type,  'operator')
			strictEqual(tokens[7].value, '>=')
		})
	})
})

