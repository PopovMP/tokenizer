'use strict'

const operators   = '! % & * + - . / : < = > ? ++ -- == <= >= != += -= *= /= %= && ||'.split(' ')
const syntaxChars = '( ) { } [ ] , ;'.split(' ')

const reservedWords = {
	'data type' : 'bool float uint char int ulong class long union color short ushort datetime string void double struct enum uchar'.split(' '),
	'modifier'  : 'const private virtual delete protected override public'.split(' '),
	'reserved'  : 'break operator case else pack continue for return default if sizeof delete new switch do while'.split(' '),
	'constant'  : 'null true false undefined'.split(' '),
}

function tokenize(sourceCode) {
	const output = []

	let line   = 0
	let column = 0

	mainLoop(0)

	return output

	function mainLoop(i) {
		if (i >= sourceCode.length) {
			return
		}

		// Add a string
		if ( isChar(i, /"/) ) {
			mainLoop( addString(i) )
			return
		}

		// Add a line comment
		if ( isCharChar(i, /\/\//) ) {
			mainLoop( addLineComment(i) )
			return
		}

		// Add syntax character
		const syntaxLen = addSpecialSymbol(i, 'syntax', syntaxChars)
		if (syntaxLen > 0) {
			mainLoop(i + syntaxLen)
			return
		}

		// Add operator
		const operatorLen = addSpecialSymbol(i, 'operator', operators)
		if (operatorLen > 0) {
			mainLoop(i + operatorLen)
			return
		}

		// Add a number
		if ( isChar(i, /[0-9]/) ) {
			mainLoop( addPattern(i, 'number', /[.0-9]/) )
			return
		}

		// Add a reserved word or an identifier
		if ( isChar(i, /[_a-zA-Z]/) ) {
			mainLoop( addWord(i) )
			return
		}

		// Add whitespace
		if ( isChar(i, /[ \t]/) ) {
			mainLoop( addPattern(i, 'space', /[ \t]/) )
			return
		}

		// Add new line
		if ( isChar(i, /[\n\r]/) ) {
			mainLoop( addPattern(i, 'eol', /[\n\r]/) )
			return
		}

		syntaxError('character not matched: ' + sourceCode[i])
	}

	function addWord(index) {

		const end  = wordLoop(index)
		const word = sourceCode.substring(index, end)

		for (const type of Object.keys(reservedWords) ) {
			if (reservedWords[type].includes(word)) {
				addToken(type, word)
				column += end - index
				return end
			}
		}

		addToken('identifier', word)
		column += end - index
		return end

		function wordLoop(i) {
			if ( sourceCode[i]?.match(/[_a-zA-Z0-9]/) ) {
				return wordLoop(i + 1)
			}

			return i
		}
	}

	function addString(index) {

		const end = stringLoop(index + 1)
		column += end - index + 1

		return end + 1

		function stringLoop(i) {
			const ch = sourceCode[i]

			if (ch === '"') {
				addToken('string', sourceCode.substring(index + 1, i) )
				return i
			}

			if (ch === '\n' || typeof ch === 'undefined') {
				syntaxError('string not closed')
			}

			return stringLoop(i + 1)
		}
	}

	function addLineComment(index) {

		return lineCommentLoop(index + 1)

		function lineCommentLoop(i) {
			const ch = sourceCode[i]

			if (ch === '\n' || typeof ch === 'undefined') {
				addToken('comment', sourceCode.substring(index + 2, i) )
				return i
			}

			return lineCommentLoop(i + 1)
		}
	}

	function addSpecialSymbol(i, type, charList) {
		if (i < sourceCode.length - 1) {
			for (const symbol of charList) {
				if (symbol.length === 2) {
					if (sourceCode[i] + sourceCode[i + 1] === symbol) {
						addToken(type, symbol)
						column += 2
						return 2
					}
				}
			}
		}

		for (const symbol of charList) {
			if (sourceCode[i] === symbol) {
				addToken(type, symbol)
				column += 1
				return 1
			}
		}

		return 0
	}

	function isChar(i, regex) {
		return sourceCode[i].match(regex)
	}

	function isCharChar(i, regex) {
		return (sourceCode[i] + sourceCode[i + 1]).match(regex)
	}

	function addPattern(i, type, regex) {
		const currLine = line
		const currCol  = column
		const end      = matchPattern(i, regex)
		const value    = sourceCode.substring(i, end)

		output.push({ line: currLine, column: currCol, type, value })

		return end
	}

	function matchPattern(i, regex) {
		if (i >= sourceCode.length) {
			return i
		}

		const ch = sourceCode[i]

		if ( ch.match(regex) ) {
			if (ch === '\n') {
				line  += 1
				column = 0
			}
			else if (ch !== '\r') {
				column += 1
			}

			return matchPattern(i + 1, regex)
		}

		return i
	}

	function addToken(type, value) {
		output.push({ line, column, type, value })
	}

	function syntaxError(message) {
		throw new Error('[' + (line + 1) + ', ' + (column + 1) + '] Syntax error: ' + message)
	}
}

module.exports = {
	tokenize,
}

