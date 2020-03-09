/*

Level: 4 kyu

Description:

Create a function that differentiates a polynomial for a given value of x.

Your function will receive 2 arguments: a polynomial as a string, and a point to evaluate the equation as an integer.

Assumptions:
There will be a coefficient near each x, unless the coefficient equals 1 or -1.
There will be an exponent near each x, unless the exponent equals 0 or 1.
All exponents will be greater or equal to zero
Examples:
differenatiate("12x+2", 3)      ==>   returns 12
differenatiate("x^2+3x+2", 3)   ==>   returns 9

*/

function cleanUp(equation) { //convert to 2D array of terms [coefficient, exponent of x]
	equation = equation.replace(/^x|(?<=\-)x|(?<=\+)x/g, '1x').replace(/-(?=\d)|-(?=x)/g, '+$').split('+').filter(function (t) {
		return t.length > 0;
	}).join('~').replace(/\$/g, '-').split('~');
	for (i = 0; i < equation.length; i++) {
		if (equation[i].includes('x')) {
			if (equation[i].includes('^') === false) {
				equation[i] = equation[i].replace('x', 'x^1');
			} equation[i] = [Number(equation[i].substring(0, equation[i].indexOf('x'))), Number(equation[i].substring(equation[i].indexOf('^') + 1))];
		} else {
			equation[i] = [Number(equation[i]), 0];
		}
	} return equation;
}

function differentiate(equation, point) {
	equation = cleanUp(equation);
	var output = 0;
	for (e = 0; e < equation.length; e++) {
		output += equation[e][0] * equation[e][1] * Math.pow(point, equation[e][1] - 1);
	} return output;
}