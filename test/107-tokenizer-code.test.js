'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize     } = require('../src/tokenizer.js')

const sourceCode = `
//+------------------------------------------------------------------+
//| The calculation of average for an array of double type           |
//+------------------------------------------------------------------+
double AverageFromArray(const double & array[],int size)
  {
   if(size<=0) return 0.0;
   double sum=0.0;
   double aver;
//---
   for(int i=0;i<size;i++)
     {
      sum+=array[i];    // Summation for the double
     }
   aver=sum/size;       // Just divide the sum by the number
//---
   Print("Calculation of the average for an array of double type");
   return aver;
  }
`

describe('tokenizer code', () => {
	describe('tokenizer.tokenize()', () => {
		it('MQL code', () => {
			const actual = tokenize(sourceCode)
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

			strictEqual(actual, sourceCode)
		})
	})
})

