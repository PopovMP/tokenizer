'use strict'

/**
 * @typedef {Object} Token
 *
 * @property {number} line
 * @property {number} column
 * @property {string} type - space, eol, comment, pragma, punctuation, operator, word, number, string, character
 * @property {string} value
 */

// Pragma starts with #: #include
// String is enclosed in double quotes: "string"
// Character is enclosed in single quotes: 'a', '\n', '\xhhhh', '\d'
// Line comment is: // a line comment

const operators    = '! % & * + - . / : < = > ? ++ -- == <= >= != += -= *= /= %= && ||'.split(' ')
const punctuations = '( ) { } [ ] , ;'.split(' ')

/**
 * Tokenizes source code
 *
 * @param {string} sourceCode
 *
 * @return {Token[]}
 */
function tokenize(sourceCode)
{
	/** @type {Token[]} */
	const tokens = []

	let line   = 0
	let column = 0

	mainLoop(0)

	return tokens

	/**
	 * Main tokenizer loop
	 *
	 * @param {number} i - code index
	 */
	function mainLoop(i)
	{
		if (i >= sourceCode.length)
			return

		// Add a string
		if ( isChar(i, /"/) ) {
			mainLoop( addString(i, 'string') )
			return
		}

		// Add a character
		if ( isChar(i, /'/) ) {
			mainLoop( addCharacter(i, 'character') )
			return
		}

		// Add a pragma
		if ( isChar(i, /#/) ) {
			mainLoop( addPragma(i, 'pragma') )
			return
		}

		// Add a line comment
		if ( isCharChar(i, /\/\//) ) {
			mainLoop( addLineComment(i, 'comment') )
			return
		}

		// Add a punctuation
		const punctuationLen = addSpecialSymbol(i, 'punctuation', punctuations)
		if (punctuationLen > 0) {
			mainLoop(i + punctuationLen)
			return
		}

		// Add an operator
		const operatorLen = addSpecialSymbol(i, 'operator', operators)
		if (operatorLen > 0) {
			mainLoop(i + operatorLen)
			return
		}

		// Add a number
		if ( isChar(i, /\d/) ) {
			mainLoop( addPattern(i, 'number', /[.\d]/) )
			return
		}

		// Add a word
		if ( isChar(i, /[_a-zA-Z]/) ) {
			mainLoop( addPattern(i, 'word', /\w/) )
			return
		}

		// Add whitespace
		if ( isChar(i, /[ \t]/) ) {
			mainLoop( addPattern(i, 'space', /[ \t]/) )
			return
		}

		// Add a new line
		if ( isChar(i, /[\r\n]/) ) {
			mainLoop( addPattern(i, 'eol', /[\r\n]/) )
			return
		}

		syntaxError('character not matched: ' + sourceCode[i])
	}

	/**
	 * Adds a character
	 *
	 * @param {number} index
	 * @param {string} type
	 *
	 * @return {number} - code index
	 */
	function addCharacter(index, type)
	{
		const end = characterLoop(index + 1)
		column += end - index + 1

		return end + 1

		function characterLoop(i)
		{
			const ch = sourceCode[i]

			if (ch === "'" && sourceCode[i+1] !== "'") {
				const character = sourceCode.slice(index + 1, i)
				addToken(type, character)

				return i
			}

			if (ch === undefined)
				syntaxError('character not closed')

			return characterLoop(i + 1)
		}
	}

	/**
	 * Adds a string
	 *
	 * @param {number} index
	 * @param {string} type
	 *
	 * @return {number} - code index
	 */
	function addString(index, type)
	{
		const end = stringLoop(index + 1)
		column += end - index + 1

		return end + 1

		function stringLoop(i)
		{
			const ch = sourceCode[i]

			if (ch === '"') {
				const str = sourceCode.slice(index + 1, i)

				if (tokens.length > 0 && tokens[tokens.length - 1].type === type)
					tokens[tokens.length - 1].value += '"' + str
				else
					addToken(type, str)

				return i
			}

			if (ch === undefined)
				syntaxError('string not closed')

			return stringLoop(i + 1)
		}
	}

	/**
	 * Adds a pragma
	 *
	 * @param {number} index
	 * @param {string} type
	 *
	 * @return {number} - code index
	 */
	function addPragma(index, type)
	{
		return pragmaLoop(index + 1)

		function pragmaLoop(i)
		{
			const ch = sourceCode[i]

			if (ch === ' ' || ch === undefined) {
				addToken(type, sourceCode.slice(index + 1, i))
				return i
			}

			return pragmaLoop(i + 1)
		}
	}

	/**
	 * Adds a line comment
	 *
	 * @param {number} index
	 * @param {string} type
	 *
	 * @return {number} - code index
	 */
	function addLineComment(index, type)
	{
		return lineCommentLoop(index + 1)

		function lineCommentLoop(i)
		{
			const ch = sourceCode[i]

			if (ch === '\n' || ch === undefined) {
				addToken(type, sourceCode.slice(index + 2, i))
				return i
			}

			return lineCommentLoop(i + 1)
		}
	}

	/**
	 * Adds a punctuation or an operator
	 *
	 * @param {number} i
	 * @param {string} type
	 * @param {string[]} charList
	 *
	 * @return {number} - index delta
	 */
	function addSpecialSymbol(i, type, charList)
	{
		const maxLength = charList.reduce((len, symbol) => Math.max(len, symbol.length), 1)

		for (let len = maxLength; len > 0; len--) {
			if (i > sourceCode.length - len)
				continue

			for (const symbol of charList) {
				if (symbol.length === len && sourceCode.slice(i, i + len) === symbol) {
					addToken(type, symbol)
					column += len
					return len
				}
			}
		}

		return 0
	}

	/**
	 * Matches a single character
	 *
	 * @param {number} i
	 * @param {RegExp} regex
	 *
	 * @return {any[]}
	 */
	function isChar(i, regex)
	{
		return sourceCode[i].match(regex)
	}

	/**
	 * Matches two character
	 *
	 * @param {number} i
	 * @param {RegExp} regex
	 *
	 * @return {any[]}
	 */
	function isCharChar(i, regex)
	{
		return (sourceCode[i] + sourceCode[i + 1]).match(regex)
	}

	/**
	 * Adds a code pattern to the token list
	 *
	 * @param {number} i - from code index
	 * @param {string} type
	 * @param {RegExp} regex
	 *
	 * @return {number}
	 */
	function addPattern(i, type, regex)
	{
		const currLine = line
		const currCol  = column
		const end      = matchPattern(i, regex)
		const value    = sourceCode.slice(i, end)

		tokens.push({line: currLine, column: currCol, type, value})

		return end
	}

	/**
	 * Matches regex, sets the line and column and returns the last index
	 *
	 * @param {number} i
	 * @param {RegExp} regex
	 *
	 * @return {number}
	 */
	function matchPattern(i, regex)
	{
		if (i >= sourceCode.length)
			return i

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

	/**
	 * Adds a token to the tokens list
	 *
	 * @param {string} type
	 * @param {string} value
	 *
	 * @return {void}
	 */
	function addToken(type, value)
	{
		tokens.push({line, column, type, value})
	}

	/**
	 * Throws an error
	 *
	 * @param {string} message
	 *
	 * @return {void}
	 */
	function syntaxError(message)
	{
		throw new Error(`[${line + 1}, ${column + 1}] Syntax error: ${message}`)
	}
}

/**
 * Stringifies tokens back to a source code
 *
 * @param {Token[]} tokens
 *
 * @return {string}
 */
function stringify(tokens)
{
	/**
	 * Gets text content of a token
	 *
	 * @param {Token} t
	 *
	 * @return {string}
	 */
	const tokenToText = (t) => {
		switch (t.type) {
			case 'string'    : return `"${t.value}"`
			case 'character' : return `'${t.value}'`
			case 'comment'   : return `//${t.value}`
			case 'pragma'    : return `#${t.value}`
			default          : return t.value
		}
	}

	return tokens.map(tokenToText).join('')
}

/**
 * Removes meaningless tokens as: space, eol, comment
 *
 * @param {Token[]} tokens
 *
 * @return {Token[]}
 */
function clean(tokens)
{
	return tokens.filter(t => !['space', 'eol', 'comment'].includes(t.type))
}

module.exports = {
	clean,
	tokenize,
	stringify,
}
