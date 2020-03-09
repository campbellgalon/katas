/*

Level: 4 kyu

Description:

Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.

For example:

nextSmaller(21) == 12
nextSmaller(531) == 513
nextSmaller(2071) == 2017
Return -1 (for Haskell: return Nothing, for Rust: return None), when there is no smaller number that contains the same digits. Also return -1 when the next smaller number with the same digits would require the leading digit to be zero.

nextSmaller(9) == -1
nextSmaller(111) == -1
nextSmaller(135) == -1
nextSmaller(1027) == -1 // 0721 is out since we don't write numbers with leading zeros
some tests will include very large numbers.
test data only employs positive integers.

*/

function nextSmaller(n) {
	var str=String(n), arr=str.split('').map(Number),b,s,nextSmaller = 0;
	for (b = arr.length-2; b >= 0; b--) {
	  if (b===0 && arr[b]<=arr[b+1]) return -1;
	  else if (arr[b]>arr[b+1]) break;
	} for (s = b+1; s<arr.length; s++) {
	  if (arr[s] < arr[b] && arr[s] > nextSmaller) nextSmaller = arr[s];
	} s = arr.lastIndexOf(nextSmaller);
	var leftPart = str.substring(-1, b) + nextSmaller;
	var rightPart = str.substring(b+1, s) + str[b] + str.substring(s+1);
	rightPart = rightPart.split('').map(Number).sort((a,b)=>(b-a)).map(String).join('');
	if (leftPart[0]==='0') return -1;
	else return Number(leftPart+rightPart);
  }