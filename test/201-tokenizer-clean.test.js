'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize, clean, stringify } = require('../index.js')

const sourceCode = `
//+------------------------------------------------------------------+
//| The calculation of average for an array of double type           |
//+------------------------------------------------------------------+
double Average(const double & array[], int size)
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
   return aver;
  }
`

describe('tokenizer code', () => {
	describe('tokenizer.clean()', () => {
		it('tokenizes, cleans and stringifies', () => {
			const actual = stringify( clean( tokenize(sourceCode) ))
			const expected = 'doubleAverage(constdouble&array[],intsize){if(size<=0)return0.0;doublesum=0.0;doubleaver;for(inti=0;i<size;i++){sum+=array[i];}aver=sum/size;returnaver;}'
			strictEqual(actual, expected)
		})
	})
})
