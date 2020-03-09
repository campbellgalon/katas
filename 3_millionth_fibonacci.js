/*

Level: 3 kyu

Description:

The year is 1214. One night, Pope Innocent III awakens to find the the archangel Gabriel floating before him. Gabriel thunders to the pope:

Gather all of the learned men in Pisa, especially Leonardo Fibonacci. In order for the crusades in the holy lands to be successful, these men must calculate the millionth number in Fibonacci's recurrence. Fail to do this, and your armies will never reclaim the holy land. It is His will.

The angel then vanishes in an explosion of white light.

Pope Innocent III sits in his bed in awe. How much is a million? he thinks to himself. He never was very good at math.

He tries writing the number down, but because everyone in Europe is still using Roman numerals at this moment in history, he cannot represent this number. If he only knew about the invention of zero, it might make this sort of thing easier.

He decides to go back to bed. He consoles himself, The Lord would never challenge me thus; this must have been some deceit by the devil. A pretty horrendous nightmare, to be sure.

Pope Innocent III's armies would go on to conquer Constantinople (now Istanbul), but they would never reclaim the holy land as he desired.

In this kata you will have to calculate fib(n) where:

fib(0) := 0
fib(1) := 1
fin(n + 2) := fib(n + 1) + fib(n)
Write an algorithm that can handle n up to 2000000.

Your algorithm must output the exact integer answer, to full precision. Also, it must correctly handle negative numbers as input.

*/

function fib(n) {
	var fib = [0n, 1n];
	for (q = 2; q < 1000; q++) {
		fib.push(fib[q - 2] + fib[q - 1]);
	}
	var coefficient = 1n;
	if (n < 0) { 
		n = n * -1; //fib(-n) = fib(n) when n is odd
		if (n % 2 === 0) { //fib(-n) = -fib(n) when n is even
			coefficient = -1n;
		}
	}
	if (n === 0 || n === 1) {
		return fib[n];
	}
	var valuesNeeded = [n];
	var equation = 'fib[' + n + ']';
	do {
		var biggest = valuesNeeded.shift();
		if (biggest % 2 === 0) {
			valuesNeeded.push(biggest / 2, biggest / 2 - 1);
			var hunted = new RegExp('fib\\\[' + biggest + '\\\]', 'g');
			var term1 = biggest / 2;
			var term2 = biggest / 2 - 1;
			equation = equation.replace(hunted, '(fib[' + term1 + ']*(2n*fib[' + term2 + ']+fib[' + term1 + ']))') //fib(2n-1) = fib(n-1)^2 + fib(n)^2
		} else {
			valuesNeeded.push(Math.ceil(biggest / 2), Math.floor(biggest / 2));
			var hunted = new RegExp('fib\\\[' + biggest + '\\\]', 'g');
			var term1 = Math.ceil(biggest / 2);
			var term2 = Math.floor(biggest / 2);
			equation = equation.replace(hunted, '(fib[' + term2 + ']**2n + fib[' + term1 + ']**2n)') //fib(2n) = ( 2 fib(n-1) + fib(n) ) fib(n)
		}
		valuesNeeded.sort(function (a, b) {
			return b - a
		});
	} while (valuesNeeded[0] > 1001);
	return coefficient * eval(equation);
}