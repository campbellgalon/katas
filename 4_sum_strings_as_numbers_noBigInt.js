/*

Level: 4 kyu

Description:

Given the string representations of two integers, return the string representation of the sum of those integers.

For example:

sumStrings('1','2') // => '3'
A string representation of an integer will contain no characters besides the ten numerals "0" to "9".
*/

function sumStrings(a, b) {
	var diff = Math.abs(a.length - b.length);
	if (a.length < b.length) {
		a = '0'.repeat(diff) + a;
	} else if (b.length < a.length) {
		b = '0'.repeat(diff) + b;
	}
	var maxStartLength = a.length;
	var output = '0'.repeat(maxStartLength + 1);
	for (i = maxStartLength - 1; i >= 0; i--) {
		var sum = Number(a[i]) + Number(b[i]);
		var sumString = String(sum);
		if (sum < 10) {
			sumString = '0' + sumString;
		}
		newValue = String(Number(sumString) + Number(output.substring(i, i + 2)));
		if (newValue.length === 1) newValue = '0' + newValue;
		output = output.substring(0, i) + newValue + output.substring(i + 2);
	}
	output = output.replace(/^0+/, '');
	return output;
}