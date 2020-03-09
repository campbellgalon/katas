/*

Level: 4 kyu

Description:

Given two different positions on a chess board, find the least number of moves it would take a knight to get from one to the other. The positions will be passed as two arguments in algebraic notation. For example, knight("a3", "b5") should return 1.

The knight is not allowed to move off the board. The board is 8x8.

For information on knight moves, see https://en.wikipedia.org/wiki/Knight_%28chess%29

For information on algebraic notation, see https://en.wikipedia.org/wiki/Algebraic_notation_%28chess%29

(Warning: many of the tests were generated randomly. If any do not work, the test cases will return the input, output, and expected output; please post them.)

*/

function knight(start, finish){
    var pica = ['a1','h1','h8','a8','b2','g2','g7','b7'];
    var ptak = ['b2','g2','g7','b7','a1','h1','h8','a8'];
    if(pica.includes(start)&&finish===ptak[pica.indexOf(start)]) {return 4;}
    var files = 'abcdefgh';
    var rankDiff = Math.abs(files.indexOf(start[0])-files.indexOf(finish[0]));
    var fileDiff = Math.abs(Number(start[1])-Number(finish[1]));
    var data = [[0,3,2,3,2,3,4,5],[3,2,1,2,3,4,3,4],[2,1,4,3,2,3,4,5],[3,2,3,2,3,4,3,4],[2,3,2,3,4,3,4,5],[3,4,3,4,3,4,5,4],[4,3,4,3,4,5,4,5],[5,4,5,4,5,4,5,6]];
    return data[rankDiff][fileDiff];
    }