/*

Level: 4 kyu

Description:

Alright, detective, one of our colleagues successfully observed our target person, Robby the robber. We followed him to a secret warehouse, where we assume to find all the stolen stuff. The door to this warehouse is secured by an electronic combination lock. Unfortunately our spy isn't sure about the PIN he saw, when Robby entered it.

The keypad has the following layout:

┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 9 │
└───┼───┼───┘
    │ 0 │
    └───┘
He noted the PIN 1357, but he also said, it is possible that each of the digits he saw could actually be another adjacent digit (horizontally or vertically, but not diagonally). E.g. instead of the 1 it could also be the 2 or 4. And instead of the 5 it could also be the 2, 4, 6 or 8.

He also mentioned, he knows this kind of locks. You can enter an unlimited amount of wrong PINs, they never finally lock the system or sound the alarm. That's why we can try out all possible (*) variations.

* possible in sense of: the observed PIN itself and all variations considering the adjacent digits

Can you help us to find all those variations? It would be nice to have a function, that returns an array (or a list in Java and C#) of all variations for an observed PIN with a length of 1 to 8 digits. We could name the function getPINs (get_pins in python, GetPINs in C#). But please note that all PINs, the observed one and also the results, must be strings, because of potentially leading '0's. We already prepared some test cases for you.

Detective, we count on you!

*/

function getPINs(observed) {
    observed = String(observed);
  var possibilities = [['0','8'],['1','2','4'],['1','2','3','5'],['2','3','6'],['1','4','5','7'],['2','4','5','6','8'],['3','5','6','9'],['4','7','8'],['5','7','8','9','0'],['6','8','9'],['0','8']]
  var potentialOutput = [];
  switch(observed.length) {
    case 1:
      potentialOutput = possibilities[Number(observed[0])];
      break;
    case 2:
      for (var a = 0; a < possibilities[Number(observed[0])].length; a++) {
        for (var b = 0; b < possibilities[Number(observed[1])].length; b++) {
          potentialOutput.push(possibilities[Number(observed[0])][a]+possibilities[Number(observed[1])][b]);
        }
      }
      break;
    case 3:
      for (var a = 0; a < possibilities[Number(observed[0])].length; a++) {
        for (var b = 0; b < possibilities[Number(observed[1])].length; b++) {
          for (var c = 0; c < possibilities[Number(observed[2])].length; c++) {
            potentialOutput.push(possibilities[Number(observed[0])][a]+possibilities[Number(observed[1])][b]+possibilities[Number(observed[2])][c]);
          }
        }
      }
      break;
    case 4:
      for (var a = 0; a < possibilities[Number(observed[0])].length; a++) {
        for (var b = 0; b < possibilities[Number(observed[1])].length; b++) {
          for (var c = 0; c < possibilities[Number(observed[2])].length; c++) {
            for (var d = 0; d < possibilities[Number(observed[3])].length; d++) {
              potentialOutput.push(possibilities[Number(observed[0])][a]+possibilities[Number(observed[1])][b]+possibilities[Number(observed[2])][c]+possibilities[Number(observed[3])][d]);
            }
          }
        }
      }
      break;
    case 5:
      for (var a = 0; a < possibilities[Number(observed[0])].length; a++) {
        for (var b = 0; b < possibilities[Number(observed[1])].length; b++) {
          for (var c = 0; c < possibilities[Number(observed[2])].length; c++) {
            for (var d = 0; d < possibilities[Number(observed[3])].length; d++) {
              for (var e = 0; e < possibilities[Number(observed[4])].length; e++) {
                potentialOutput.push(possibilities[Number(observed[0])][a]+possibilities[Number(observed[1])][b]+possibilities[Number(observed[2])][c]+possibilities[Number(observed[3])][d]+possibilities[Number(observed[4])][e]);
              }
            }
          }
        }
      }
      break;
    case 6:
      for (var a = 0; a < possibilities[Number(observed[0])].length; a++) {
        for (var b = 0; b < possibilities[Number(observed[1])].length; b++) {
          for (var c = 0; c < possibilities[Number(observed[2])].length; c++) {
            for (var d = 0; d < possibilities[Number(observed[3])].length; d++) {
              for (var e = 0; e < possibilities[Number(observed[4])].length; e++) {
                for (var f = 0; f < possibilities[Number(observed[5])].length; f++) {
                  potentialOutput.push(possibilities[Number(observed[0])][a]+possibilities[Number(observed[1])][b]+possibilities[Number(observed[2])][c]+possibilities[Number(observed[3])][d]+possibilities[Number(observed[4])][e]+possibilities[Number(observed[5])][f]);
                }
              }
            }
          }
        }
      }
      break;
    case 7:
      for (var a = 0; a < possibilities[Number(observed[0])].length; a++) {
        for (var b = 0; b < possibilities[Number(observed[1])].length; b++) {
          for (var c = 0; c < possibilities[Number(observed[2])].length; c++) {
            for (var d = 0; d < possibilities[Number(observed[3])].length; d++) {
              for (var e = 0; e < possibilities[Number(observed[4])].length; e++) {
                for (var f = 0; f < possibilities[Number(observed[5])].length; f++) {
                  for (var g = 0; g < possibilities[Number(observed[6])].length; g++) {
                    potentialOutput.push(possibilities[Number(observed[0])][a]+possibilities[Number(observed[1])][b]+possibilities[Number(observed[2])][c]+possibilities[Number(observed[3])][d]+possibilities[Number(observed[4])][e]+possibilities[Number(observed[5])][f]+possibilities[Number(observed[6])][g]);
                  }
                }
              }
            }
          }
        }
      }
      break;
    case 8:
      for (var a = 0; a < possibilities[Number(observed[0])].length; a++) {
        for (var b = 0; b < possibilities[Number(observed[1])].length; b++) {
          for (var c = 0; c < possibilities[Number(observed[2])].length; c++) {
            for (var d = 0; d < possibilities[Number(observed[3])].length; d++) {
              for (var e = 0; e < possibilities[Number(observed[4])].length; e++) {
                for (var f = 0; f < possibilities[Number(observed[5])].length; f++) {
                  for (var g = 0; g < possibilities[Number(observed[6])].length; g++) {
                    for (var h = 0; h < possibilities[Number(observed[7])].length; h++) {
                      potentialOutput.push(possibilities[Number(observed[0])][a]+possibilities[Number(observed[1])][b]+possibilities[Number(observed[2])][c]+possibilities[Number(observed[3])][d]+possibilities[Number(observed[4])][e]+possibilities[Number(observed[5])][f]+possibilities[Number(observed[6])][g]+possibilities[Number(observed[7])][h]);
                    }
                  }
                }
              }
            }
          }
        }
      }
      break;
  }
  return [...new Set(potentialOutput)];
  }