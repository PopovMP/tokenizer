'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../src/tokenizer.js')

describe('tokenizer string', () => {
	describe('tokenizer.tokenize()', () => {
		it('""', () => {
			const tokens = tokenize('""')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'string')
			strictEqual(actual.value,  '')
		})

		it(' ""', () => {
			const tokens = tokenize(' ""')
			const actual = tokens[1]
			strictEqual(tokens.length, 2)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 1)
			strictEqual(actual.type,   'string')
			strictEqual(actual.value,  '')
		})

		it('"a"', () => {
			const tokens = tokenize('"a"')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'string')
			strictEqual(actual.value,  'a')
		})

		it('  "a"', () => {
			const tokens = tokenize('  "a"')
			const actual = tokens[1]
			strictEqual(tokens.length, 2)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 2)
			strictEqual(actual.type,   'string')
			strictEqual(actual.value,  'a')
		})

		it('"aa"', () => {
			const tokens = tokenize('"aa"')
			const actual = tokens[0]
			strictEqual(tokens.length, 1)
			strictEqual(actual.line,   0)
			strictEqual(actual.column, 0)
			strictEqual(actual.type,   'string')
			strictEqual(actual.value,  'aa')
		})

		it(' "aa"  "bbb" "cccc" "" ', () => {
			const tokens = tokenize(' "aa"  "bbb" "cccc" "" ')
			strictEqual(tokens.length, 9)
			strictEqual(tokens[1].column, 1)
			strictEqual(tokens[1].value, 'aa')
			strictEqual(tokens[3].column, 7)
			strictEqual(tokens[3].value, 'bbb')
			strictEqual(tokens[5].column, 13)
			strictEqual(tokens[5].value, 'cccc')
			strictEqual(tokens[7].column, 20)
			strictEqual(tokens[7].value, '')
		})

		it('   NLCR "aa"', () => {
			const tokens = tokenize('   \n\r "aa"')
			const actual = tokens[3]
			strictEqual(tokens.length, 4)
			strictEqual(actual.line,   1)
			strictEqual(actual.column, 1)
			strictEqual(actual.type,   'string')
			strictEqual(actual.value,  'aa')
		})

		it('""""""', () => {
			const tokens = tokenize('""""""')
			strictEqual(tokens.length, 1)
			strictEqual(tokens[0].value,  '""')
		})

		it('"a""b"', () => {
			const tokens = tokenize('"a""b"')
			strictEqual(tokens.length, 1)
			strictEqual(tokens[0].value,  'a"b')
		})
	})
})

