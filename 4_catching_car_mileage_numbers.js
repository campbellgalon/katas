/*

Level: 4 kyu

Description:

"7777...8?!??!", exclaimed Bob, "I missed it again! Argh!" Every time there's an interesting number coming up, he notices and then promptly forgets. Who doesn't like catching those one-off interesting mileage numbers?

Let's make it so Bob never misses another interesting number. We've hacked into his car's computer, and we have a box hooked up that reads mileage numbers. We've got a box glued to his dash that lights up yellow or green depending on whether it receives a 1 or a 2 (respectively).

It's up to you, intrepid warrior, to glue the parts together. Write the function that parses the mileage number input, and returns a 2 if the number is "interesting" (see below), a 1 if an interesting number occurs within the next two miles, or a 0 if the number is not interesting.

Note: In Haskell, we use No, Almost and Yes instead of 0, 1 and 2.

"Interesting" Numbers
Interesting numbers are 3-or-more digit numbers that meet one or more of the following criteria:

Any digit followed by all zeros: 100, 90000
Every digit is the same number: 1111
The digits are sequential, incementing†: 1234
The digits are sequential, decrementing‡: 4321
The digits are a palindrome: 1221 or 73837
The digits match one of the values in the awesomePhrases array
† For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.

So, you should expect these inputs and outputs:

// "boring" numbers
isInteresting(3, [1337, 256]);    // 0
isInteresting(3236, [1337, 256]); // 0

// progress as we near an "interesting" number
isInteresting(11207, []); // 0
isInteresting(11208, []); // 0
isInteresting(11209, []); // 1
isInteresting(11210, []); // 1
isInteresting(11211, []); // 2

// nearing a provided "awesome phrase"
isInteresting(1335, [1337, 256]); // 1
isInteresting(1336, [1337, 256]); // 1
isInteresting(1337, [1337, 256]); // 2
Error Checking
A number is only interesting if it is greater than 99!
Input will always be an integer greater than 0, and less than 1,000,000,000.
The awesomePhrases array will always be provided, and will always be an array, but may be empty. (Not everyone thinks numbers spell funny words...)
You should only ever output 0, 1, or 2.

*/

function isPalindrome(n) {
    var numlength = String(n).length;
    var soFarPalindromic = 1;
        for (i=0; i<(numlength/2); i++) {
            if(String(n)[i]!==String(n)[numlength-1-i]) {soFarPalindromic--}
        }
    return soFarPalindromic === 1
}
function calculate(number, awesomePhrases) {
    if (number <= 97) {
        return 0;
    }
    var carrier = [0];
    var digitsInc = [1,2,3,4,5,6,7,8,9,0];
    var digitsDec = [9,8,7,6,5,4,3,2,1,0];
    if(awesomePhrases.includes(number)) {
        carrier.push(2);
    } if (number>99){
    var allZeros = 0;
    var lastChar = String(number)[0];
    var incrementUp = 0;
    var incrementDown = 0;
    var zeroPass = '0';
    for (i=1; i<String(number).length; i++) {
    if ((String(number)[i] !== '0')||(zeroPass!=='0')) {allZeros++;}
    if (Number(String(number)[i])!==digitsInc[digitsInc.indexOf(Number(lastChar))+1]) {incrementUp++}
    if (Number(String(number)[i])!==digitsDec[digitsDec.indexOf(Number(lastChar))+1]) {incrementDown++}
    lastChar = String(number)[i];
    zeroPass = lastChar;
    } if ((allZeros===0)||(incrementUp===0)||(incrementDown===0)) {
        carrier.push(2)
    } if (isPalindrome(number)) {
        carrier.push(2);
    }
    } 
     return Math.max.apply(null, carrier);
}
function isInteresting(number, awesomePhrases) {
    var result = 0;
    if(calculate(number, awesomePhrases)===2){
        result=2;
    } else if (calculate(number+1, awesomePhrases)===2){
        result=1;
    } else if (calculate(number+2, awesomePhrases)===2){
        result=1;
    } 
    return result;
}