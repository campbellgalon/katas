/*

Level: 6 kyu

Description:

Backwards Read Primes are primes that when read backwards in base 10 (from right to left) are a different prime. (This rules out primes which are palindromes.)

Examples:
13 17 31 37 71 73 are Backwards Read Primes
13 is such because it's prime and read from right to left writes 31 which is prime too. Same for the others.

Task
Find all Backwards Read Primes between two positive given numbers (both inclusive), the second one always being greater than or equal to the first one. The resulting array or the resulting string will be ordered following the natural order of the prime numbers.

Example
backwardsPrime(2, 100) => [13, 17, 31, 37, 71, 73, 79, 97] backwardsPrime(9900, 10000) => [9923, 9931, 9941, 9967] backwardsPrime(501, 599) => []

Note for Forth
Return only the first backwards-read prime between start and end or 0 if you don't find any

backwardsPrime(2, 100) => [13, 17, 31, 37, 71, 73, 79, 97] 
backwardsPrime(9900, 10000) => [9923, 9931, 9941, 9967]

*/

function isPrime(n) {
    if ((n===2)||(n===3)) {return true;}
    if (n%2===0) {return false;}
    for (k=3; k<=Math.sqrt(n); k+=2) {
        if (n%k===0) {return false;}
    } return n>1;
}


function backwardsPrime(start, stop){
    var output = [];
    var backwards = 0;
    if (start%2===0) {start++;}
    for (i=start; i<=stop; i+=2) {
        backwards = Number(String(i).split('').reverse().join(''));
        if ((backwards!==i)&&isPrime(i)&&isPrime(backwards)) {
            output.push(i);
        }
    } return output;
}