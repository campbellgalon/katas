/*

Level: 4 kyu

Description:

In this kata you have to create all permutations of an input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

Examples:

permutations('a'); // ['a']
permutations('ab'); // ['ab', 'ba']
permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
The order of the permutations doesn't matter.

*/

function permutations(string) {
	if (string.length < 2) return string.split('');
	var output = [];
	for (var i = 0; i < string.length; i++) {
		var char = string[i];
		if (string.indexOf(char) != i)
			continue;
		var remainingString = string.slice(0, i) + string.slice(i + 1, string.length);
		for (var subPermutation of permutations(remainingString))
			output.push(char + subPermutation)
	}
	return output;
}