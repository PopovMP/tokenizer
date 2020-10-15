'use strict'

const operators    = '! % & * + - . / : < = > ? ++ -- == <= >= != += -= *= /= %= && ||'.split(' ')
const punctuations = '( ) { } [ ] , ;'.split(' ')

function tokenize(sourceCode) {
	const tokens = []

	let line   = 0
	let column = 0

	mainLoop(0)

	return tokens

	function mainLoop(i) {
		if (i >= sourceCode.length) {
			return
		}

		// Add a string
		if ( isChar(i, /"/) ) {
			mainLoop( addString(i, 'string') )
			return
		}

		// Add a line comment
		if ( isCharChar(i, /\/\//) ) {
			mainLoop( addLineComment(i, 'comment') )
			return
		}

		// Add punctuation
		const punctuationLen = addSpecialSymbol(i, 'punctuation', punctuations)
		if (punctuationLen > 0) {
			mainLoop(i + punctuationLen)
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

		// Add a word
		if ( isChar(i, /[_a-zA-Z]/) ) {
			mainLoop( addPattern(i, 'word', /[_a-zA-Z0-9]/) )
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

	function addString(index, type) {

		const end = stringLoop(index + 1)
		column += end - index + 1

		return end + 1

		function stringLoop(i) {
			const ch = sourceCode[i]

			if (ch === '"') {
				const str = sourceCode.substring(index + 1, i)
				if (tokens.length > 0 && tokens[tokens.length - 1].type === type) {
					tokens[tokens.length - 1].value += '"' + str
				}
				else {
					addToken(type, str)
				}
				return i
			}

			if (ch === '\n' || typeof ch === 'undefined') {
				syntaxError('string not closed')
			}

			return stringLoop(i + 1)
		}
	}

	function addLineComment(index, type) {

		return lineCommentLoop(index + 1)

		function lineCommentLoop(i) {
			const ch = sourceCode[i]

			if (ch === '\n' || typeof ch === 'undefined') {
				addToken(type, sourceCode.substring(index + 2, i) )
				return i
			}

			return lineCommentLoop(i + 1)
		}
	}

	function addSpecialSymbol(i, type, charList) {
		const maxLength = charList.reduce( (len, symbol) => Math.max(len, symbol.length), 1)

		for (let len = maxLength; len > 0; len--) {
			if (i > sourceCode.length - len) {
				continue
			}

			for (const symbol of charList) {
				if (symbol.length === len && sourceCode.substr(i, len) === symbol) {
					addToken(type, symbol)
					column += len
					return len
				}
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

		tokens.push({ line: currLine, column: currCol, type, value })

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
		tokens.push({ line, column, type, value })
	}

	function syntaxError(message) {
		throw new Error('[' + (line + 1) + ', ' + (column + 1) + '] Syntax error: ' + message)
	}
}

function stringify(tokens) {
	return tokens
		.map( t => {
			switch(t.type) {
				case 'string':
					return '"' + t.value + '"'
				case 'comment':
					return '//' + t.value
				default:
					return t.value
			}
		})
		.join('')
}

function clean(tokens) {
	return tokens.filter( t => !['space', 'eol', 'comment'].includes(t.type) )
}

module.exports = {
	clean,
	tokenize,
	stringify,
}
