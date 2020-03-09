/*

Level: 5 kyu

Description:

Using a single function provided with an array, create a new one in the following ways:

Separate array elements into chunks. Each chunk will contain 2^abs(n) elements where n is the "distance" to the median chunk.
The median chunk will have one single element, or will not appear in the output if there is some ambiguity about it.
If an outlying chunk does not have enough elements to reach the 2^abs(n) requirement, it will contain as many elements as remain.
Chuncks in mirrored places (compared to the median chunk) should be of the same length.
You must maintain original element order within each chunk.
You must maintain original element order from chunk to chunk.
Example Input/Solution:

input:    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
solution: [[1,2,3,4,5,6,7,8],[9,10,11,12],[13,14],[15],[16,17],[18,19,20,21],[22,23,24,25,26,27,28,29]]
Note: do it efficiently. Your function will have to be at most 2.5x slower than the reference solution.

*/

function mirroredExponentialChunks(arr){
    var output = [];
    if(arr.length < 3) { //Lower edge case handler
        if(arr.length === 2) return [[arr[0]], [arr[1]]];
        if(arr.length === 1) return [arr];
        if(arr.length === 0) return [];
    } else if(arr.length % 2 === 0) { //Even array handler
        var lastTermFirstHalf = arr.length/2-1;
        var groupsOnEachSide = 0;
        var accountedForOnEachSide = 0;
        for (i=1;;i++) {
            if(!arr[lastTermFirstHalf+accountedForOnEachSide+2**i]) {
                break;
            } else {
                accountedForOnEachSide+=2**i;
                groupsOnEachSide++;
            }
        }
        var remainder = (arr.length)/2 - accountedForOnEachSide;
        var lastTouched = 0;
        if (remainder>0) {
            output.push(arr.slice(lastTouched, remainder));
            lastTouched += remainder;
        } for (l=groupsOnEachSide;l>0;l--) {
            output.push(arr.slice(lastTouched, lastTouched+(2**l)));
            lastTouched = lastTouched+(2**l);
        }  for (r=1;r<=groupsOnEachSide;r++) {
            output.push(arr.slice(lastTouched, lastTouched+(2**r)));
            lastTouched = lastTouched+(2**r);
        }  if (remainder>0) {
            output.push(arr.slice(arr.length-remainder, arr.length));
        }  //console.log('input: '+arr+'\ngroups: '+groupsOnEachSide+'\naccounted: '+accountedForOnEachSide+'\nremainder: '+remainder+'\noutput: '+output.join(' / '));
        return output;



    } else { //Odd array handler
        var middleIndex = Math.floor((arr.length-1)/2);
        var groupsOnEachSide = 0;
        var accountedForOnEachSide = 0;
        for (i=1;;i++) {
            if(!arr[middleIndex+accountedForOnEachSide+2**i]) {
                break;
            } else {
                accountedForOnEachSide+=2**i;
                groupsOnEachSide++;
            }
        }
        var remainder = (arr.length-1)/2 - accountedForOnEachSide;
        var lastTouched = 0;
        if (remainder>0) {
            output.push(arr.slice(lastTouched, remainder));
            lastTouched += remainder;
        } for (l=groupsOnEachSide;l>0;l--) {
            output.push(arr.slice(lastTouched, lastTouched+(2**l)));
            lastTouched = lastTouched+(2**l);
        } output.push([arr[middleIndex]]);
        lastTouched++;
        for (r=1;r<=groupsOnEachSide;r++) {
            output.push(arr.slice(lastTouched, lastTouched+(2**r)));
            lastTouched = lastTouched+(2**r);
        } if (remainder>0) {
            output.push(arr.slice(arr.length-remainder, arr.length));
        } //console.log('input: '+arr+'\ngroups: '+groupsOnEachSide+'\naccounted: '+accountedForOnEachSide+'\nremainder: '+remainder+'\noutput: '+output.join(' / '));
        return output;
    }

}