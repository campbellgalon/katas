/*

Level: 2 kyu

Description:

Instructions
Given a mathematical expression as a string you must return the result as a number.

Numbers
Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.

Operators
You need to support the following mathematical operators:

Multiplication *
Division / (as true division)
Addition +
Subtraction -
Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.

Parentheses
You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6

Whitespace
There may or may not be whitespace between numbers and operators.

An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e., all of the following are valid expressions.

1-1    // 0
1 -1   // 0
1- 1   // 0
1 - 1  // 0
1- -1  // 2
1 - -1 // 2

6 + -(4)   // 2
6 + -( -4) // 10
And the following are invalid expressions

1 - - 1    // Invalid
1- - 1     // Invalid
6 + - (4)  // Invalid
6 + -(- 4) // Invalid
Validation
You do not need to worry about validation - you will only receive valid mathematical expressions following the above rules.

NOTE: Both eval and Function are disabled. Same goes for String.match.
*/

const calc = value => {
    value = value.replace(/--/g,'+').replace(/ /g,'');
    var exec, char = /^[-+]?\d+(\.\d+)?$/, parenthetical = /\(([^(]*?)\)/, value1 = /(.*[^*/]\b)([+-])(.+)/, value2 = /(.+)([*/])(.+)/;
    while (exec = parenthetical.exec(value)) {
      value = value.replace(parenthetical, calc(exec[1]));
    } while (exec = value1.exec(value)) {
      var term1 = calc(exec[1]);
      var term2 = calc(exec[3]);
      var operation = exec[2];
      var localCalculation = operation === '+' ? +term1 + +term2 : +term1 - +term2;
      value = value.replace(value1, localCalculation);
    } while (exec = value2.exec(value)) {
      var term1 = calc(exec[1]);
      var term2 = calc(exec[3]);
      var operation = exec[2];
      var localCalculation = operation === '*' ? +term1 * +term2 : +term1 / +term2;
      value = value.replace(value2, localCalculation);
    } if (exec = char.exec(value)) {
      return Number(exec[0]);
    } return value;
  };