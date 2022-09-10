'use strict'

const { strictEqual  } = require('assert')
const { describe, it } = require('@popovmp/mocha-tiny')
const { tokenize, stringify } = require('../index.js')

const sourceCode = `
#include <stdio.h>

//+------------------------------------------------------------------+
//| The calculation of average for an array of double type           |
//+------------------------------------------------------------------+
double AverageFromArray(const double & array[],int size)
  {
   if(size<=0) return 0.0;
   double sum=0.0;
   double aver;
   char ch = '\'';
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
	describe('tokenizer.stringify()', () => {
		it('tokenizes and stringifies', () => {
			const actual = stringify( tokenize(sourceCode) )

			strictEqual(actual, sourceCode)
		})
	})
})
