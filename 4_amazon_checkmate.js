/*

Level: 4 kyu

Description:

An amazon (also known as a queen+knight compound) is an imaginary chess piece that can move like a queen or a knight (or, equivalently, like a rook, bishop, or knight). The diagram below shows all squares which the amazon attacks from e4 (circles represent knight-like moves while crosses correspond to queen-like moves).



Recently you've come across a diagram with only three pieces left on the board: a white amazon, white king and black king.

It's black's move. You don't have time to determine whether the game is over or not, but you'd like to figure it out in your head.

Unfortunately, the diagram is smudged and you can't see the position of the black king, so it looks like you'll have to check them all.

Given the positions of white pieces on a standard chessboard, determine the number of possible black king's positions such that:

It's a checkmate (i.e. black's king is under amazon's attack and it cannot make a valid move);

It's a check (i.e. black's king is under amazon's attack but it can reach a safe square in one move);

It's a stalemate (i.e. black's king is on a safe square but it cannot make a valid move);

Black's king is on a safe square and it can make a valid move.

Note that two kings cannot be placed on two adjacent squares (including two diagonally adjacent ones).

Example
For king = "d3" and amazon = "e4", the output should be [5, 21, 0, 29].



Red crosses correspond to the checkmate positions, orange pluses refer to checks and green circles denote safe squares.

For king = "a1" and amazon = "g5", the output should be [0, 29, 1, 29].



Stalemate position is marked by a blue square.

Input
String king
Position of white's king in chess notation.

String amazon
Position of white's amazon in the same notation.

Constraints: amazon ≠ king.

Output
An array of four integers, each equal to the number of black's king positions corresponding to a specific situation. The integers should be presented in the same order as the situations were described, i.e. 0 for checkmates, 1 for checks, etc.

*/

var ranks = ['x','x','x','x','x','x','x','x','a','b','c','d','e','f','g','h','x','x','x','x','x','x','x','x'];
var files = ['x','x','x','x','x','x','x','x',1,2,3,4,5,6,7,8,'x','x','x','x','x','x','x','x'];
function surroundingSquares(position) {
    var rank = position[0];
    var file = Number(position[1]);
    var allCases = [ranks[ranks.indexOf(rank)-1]+files[files.indexOf(file)-1],ranks[ranks.indexOf(rank)-1]+(file), ranks[ranks.indexOf(rank)-1]+files[files.indexOf(file)+1], rank+files[files.indexOf(file)-1], rank+files[files.indexOf(file)+1], ranks[ranks.indexOf(rank)+1]+files[files.indexOf(file)-1], ranks[ranks.indexOf(rank)+1]+(file), ranks[ranks.indexOf(rank)+1]+files[files.indexOf(file)+1]];
    var output = [];
    for (i=0; i<allCases.length; i++) {
        if((allCases[i].includes('x')===false)&&(allCases[i].includes(undefined)===false)) {
            output.push(allCases[i])
        }
    }
    return output;
}
function amazonCheckmate(king, amazon) {
    var checks = [];
    var kingRank = king[0];
    var kingFile = Number(king[1]);
    var amazonRank = amazon[0];
    var amazonFile = Number(amazon[1]);
    var amazonProtectedByKing = 0;
      if ((Math.abs(ranks.indexOf(amazonRank)-ranks.indexOf(kingRank))<=1)&&(Math.abs(files.indexOf(amazonFile)-files.indexOf(kingFile))<=1)) {
          amazonProtectedByKing++;
      }
     var impossible = [king, amazon];
    for (m=0; m<surroundingSquares(king).length; m++) {
        if(impossible.includes(surroundingSquares(king)[m])===false){
        impossible.push(surroundingSquares(king)[m]);
        }
    } 
    var knightBrute = [];
    knightBrute.push(ranks[ranks.indexOf(amazonRank)-2]+files[files.indexOf(amazonFile)-1],ranks[ranks.indexOf(amazonRank)-2]+files[files.indexOf(amazonFile)+1],ranks[ranks.indexOf(amazonRank)-1]+files[files.indexOf(amazonFile)-2],ranks[ranks.indexOf(amazonRank)-1]+files[files.indexOf(amazonFile)+2],ranks[ranks.indexOf(amazonRank)+1]+files[files.indexOf(amazonFile)-2],ranks[ranks.indexOf(amazonRank)+1]+files[files.indexOf(amazonFile)+2], ranks[ranks.indexOf(amazonRank)+2]+files[files.indexOf(amazonFile)-1],ranks[ranks.indexOf(amazonRank)+2]+files[files.indexOf(amazonFile)+1]);
    for(i=0; i<knightBrute.length; i++){ //delete invalid and impossible squares
        if((knightBrute[i].includes('x')===false)&&(knightBrute[i].includes(undefined)===false)&&(impossible.includes(knightBrute[i])===false)) {
            checks.push(knightBrute[i]);
        }
    }
    var amazonBrute = [];
    var amazonUnblocked = [];
    var amazonDiagRankDownFileDown = [];
    var amazonDiagRankUpFileDown = [];
    var amazonDiagRankUpFileUp = [];
    var amazonDiagRankDownFileUp = [];
    for (i=1; i<8; i++) {
        amazonBrute.push(amazonRank+(files[files.indexOf(amazonFile)+i]));
        amazonBrute.push(amazonRank+(files[files.indexOf(amazonFile)-i]));
        amazonBrute.push(ranks[ranks.indexOf(amazonRank)-i]+amazonFile);
        amazonBrute.push(ranks[ranks.indexOf(amazonRank)+i]+amazonFile);
        amazonBrute.push(ranks[ranks.indexOf(amazonRank)-i]+files[files.indexOf(amazonFile)-i]);
        amazonDiagRankDownFileDown.push(ranks[ranks.indexOf(amazonRank)-i]+files[files.indexOf(amazonFile)-i]);
        amazonBrute.push(ranks[ranks.indexOf(amazonRank)+i]+files[files.indexOf(amazonFile)-i]);
        amazonDiagRankUpFileDown.push(ranks[ranks.indexOf(amazonRank)+i]+files[files.indexOf(amazonFile)-i]);
        amazonBrute.push(ranks[ranks.indexOf(amazonRank)+i]+files[files.indexOf(amazonFile)+i]);
        amazonDiagRankUpFileUp.push(ranks[ranks.indexOf(amazonRank)+i]+files[files.indexOf(amazonFile)+i]);
        amazonBrute.push(ranks[ranks.indexOf(amazonRank)-i]+files[files.indexOf(amazonFile)+i]);
        amazonDiagRankDownFileUp.push(ranks[ranks.indexOf(amazonRank)-i]+files[files.indexOf(amazonFile)+i]);
    } for (i=0; i<amazonBrute.length; i++) {
        if((amazonBrute[i].includes('x')===false)&&(amazonBrute[i].includes(undefined)===false)){
            amazonUnblocked.push(amazonBrute[i]);
        }
    } 
   var blockedBrute = [king];
   var blocked = [];
   if(amazonUnblocked.includes(king)){
       if (kingRank === amazonRank) {
           if (kingFile < amazonFile) {
               for (i=0; i<7; i++) {
                   blockedBrute.push(kingRank+(kingFile-i));
               }
           } else {
               for (i=0; i<7; i++) {
                   blockedBrute.push(kingRank+(kingFile+i))
               }
           }
       } else if (kingFile === amazonFile) {
           if (ranks[ranks.indexOf(kingRank)] < ranks[ranks.indexOf(amazonRank)]) {
               for (i=1; i<8; i++) {
                   blockedBrute.push(ranks[ranks.indexOf(kingRank)-i]+kingFile);
               }
           } else {
               for (i=1; i<8; i++) {
                    blockedBrute.push(ranks[ranks.indexOf(kingRank)+i]+kingFile);
                }
           }
       } else if (amazonDiagRankDownFileDown.includes(king)) {
            for (i=1; i<8; i++) {
                blockedBrute.push(ranks[ranks.indexOf(kingRank)-i]+files[files.indexOf(kingFile)-i]);
            }
       } else if (amazonDiagRankUpFileDown.includes(king)) {
            for (i=1; i<8; i++) {
                blockedBrute.push(ranks[ranks.indexOf(kingRank)+i]+files[files.indexOf(kingFile)-i]);
            }
       } else if (amazonDiagRankUpFileUp.includes(king)) {
            for (i=1; i<8; i++) {
                blockedBrute.push(ranks[ranks.indexOf(kingRank)+i]+files[files.indexOf(kingFile)+i]);
            }
       } else if (amazonDiagRankDownFileUp.includes(king)) {
            for (i=1; i<8; i++) {
                blockedBrute.push(ranks[ranks.indexOf(kingRank)-i]+files[files.indexOf(kingFile)+i]);
            }
       }
   } for (i=0; i<blockedBrute.length; i++) {
    if((blockedBrute[i].includes('x')===false)&&(blockedBrute[i].includes(undefined)===false)&&(blocked.includes(blockedBrute[i])===false)){
        blocked.push(blockedBrute[i]);
      }
   } 
   for (i=0; i<amazonUnblocked.length; i++) {
    if(blocked.includes(amazonUnblocked[i])===false){
        checks.push(amazonUnblocked[i]);
    }
   }
  var safe = [];
  var allSquares = [];
  for (i=1; i<9; i++) {
      for (j=8; j<16; j++) {
          allSquares.push(ranks[j]+i);
      }
  } for (k=0; k<allSquares.length; k++) {
      if ((checks.includes(allSquares[k])===false)&&(impossible.includes(allSquares[k])===false)){
          safe.push(allSquares[k]);
      }
  }
  var safeAndValid = [];
  for (q=0; q<safe.length; q++) {
    if(surroundingSquares(safe[q]).some(r=> safe.includes(r))===true) {
        safeAndValid.push(safe[q]);
    }
  }
  var checkmates = [];
  for (z=0; z<checks.length; z++) {
    if(surroundingSquares(checks[z]).some(r=> safe.includes(r))===false) {
        if(impossible.includes(checks[z])===false){
            checkmates.push(checks[z]);
        }
    }
}
var checksFinal = [];
for (i=0; i<checks.length; i++) {
    if ((impossible.includes(checks[i])===false)&&(checkmates.includes(checks[i]))===false) {
        checksFinal.push(checks[i]);
    }
}
var checkmatesFinal = [];
var dancingAroundTheAmazonian = surroundingSquares(amazon);
if(amazonProtectedByKing===0) {
    for (i=0; i<checkmates.length; i++) {
        if(dancingAroundTheAmazonian.includes(checkmates[i])===false) {
            checkmatesFinal.push(checkmates[i]);
        } else {
            checksFinal.push(checkmates[i]);
        }
    }
} else {
    checkmatesFinal = checkmates;
}
  var stalemates = [];
  for (b=0; b<safe.length; b++) {
      if(surroundingSquares(safe[b]).some(r=> safe.includes(r))==false) {
          stalemates.push(safe[b]);
      }
  }
return [checkmatesFinal.length, checksFinal.length, stalemates.length, safeAndValid.length]
}