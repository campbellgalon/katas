/*

Level: 4 kyu

Description:

Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
For better understanding, please follow the numbers of the next array consecutively:

array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]

NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.

NOTE 2: The 0x0 (empty matrix) is represented as en empty array inside an array [[]].
*/

snail = function(array) {
    var sideLength = 0;
    var movesMade = 0;
    var movesRequired = 0;
    var cyclesCompleted = 0;
    var output = [];
    if (array===[[]]) {
        return [];
    } else movesRequired++;
    sideLength = array[0].length;
    for (i=sideLength-1; i>0; i--) { //calculate moves required
        movesRequired += 2;
    } do {
        if (movesMade < movesRequired) { //right operation
            for (i=cyclesCompleted; i<sideLength-cyclesCompleted;i++) {
                output.push(array[cyclesCompleted][i])
            } movesMade++;
        } else {return output;}
        if (movesMade < movesRequired) { //down operation
            for (i=cyclesCompleted+1; i<(sideLength-cyclesCompleted); i++) {
                output.push(array[i][sideLength-1-cyclesCompleted]);
            } movesMade++;
        } else {return output;}
        if (movesMade < movesRequired) { //left operation
            for (i=(sideLength-cyclesCompleted-2); i>=cyclesCompleted; i--) {
                output.push(array[sideLength-1-cyclesCompleted][i]);
            } movesMade++;
        } else {return output;}
        if (movesMade < movesRequired) { //up operation
            for (i=(sideLength-cyclesCompleted-2); i>cyclesCompleted; i--) {
                output.push(array[i][cyclesCompleted]);
            } movesMade++;
        } else {return output;}
        cyclesCompleted++;
    } while (true) 
}