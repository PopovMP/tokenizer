'use strict'

const { tokenize } = require('../src/tokenizer.js')

const sourceCode = `
//+------------------------------------------------------------------+
//| The calculation of average for an array of double type           |
//+------------------------------------------------------------------+
double AverageFromArray(const double & array[], int size)
{
	if (size <= 0)
		return 0.0;

	double sum = 0.0;
	double aver;

	//---
	for (int i = 0; i < size; i++)
	{
		sum += array[i];    // Summation for the double
	}

	aver = sum / size;       // Just divide the sum by the number
	//---
	Print("Calculation of the average for an array of double type");

	return aver;
}
`

function nstr(n) {
	n++
	return n < 10
		? '  ' + n
		: n < 100
			? ' ' + n
			: n
}

const output = tokenize(sourceCode)
	.map( t => `[${ nstr(t.line) }, ${ nstr(t.column) }] ${t.type}\t=> ${t.value}`)
	.join('\n')

console.log( output )

