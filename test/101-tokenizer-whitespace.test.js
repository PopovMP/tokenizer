'use strict'

const { strictEqual, deepStrictEqual } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../src/tokenizer.js')

describe('tokenizer whitespace', () => {
	describe('tokenizer.tokenize()', () => {
		it('empty code', () => {
			const tokens = tokenize('')
			deepStrictEqual(tokens, [])
		})

		it('space', () => {
			const tokens = tokenize(' ')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'space')
			strictEqual(actual.value,  ' ')
		})

		it('space space', () => {
			const tokens = tokenize('  ')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'space')
			strictEqual(actual.value,  '  ')
		})

		it('tab', () => {
			const tokens = tokenize('\t')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'space')
			strictEqual(actual.value,  '\t')
		})

		it('space tab', () => {
			const tokens = tokenize('  \t')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'space')
			strictEqual(actual.value,  '  \t')
		})

		it('spaces and tabs', () => {
			const tokens = tokenize('   \t\t \t')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'space')
			strictEqual(actual.value,  '   \t\t \t')
		})
	})
})

