/*

Level: 4 kyu

Description:

Introduction

Brainfuck is one of the most well-known esoteric programming languages. But it can be hard to understand any code longer that 5 characters. In this kata you have to solve that problem.

Description

In this kata you have to write a function which will do 3 tasks:

Optimize the given Brainfuck code.
Check it for mistakes.
Translate the given Brainfuck programming code into C programming code.
More formally about each of the tasks:

Your function has to remove from the source code all useless command sequences such as: '+-', '<>', '[]'. Also it must erase all characters except +-<>,.[].
Example:
"++--+." -> "+."
"[][+++]" -> "[+++]"
"<>><" -> ""
If the source code contains unpaired braces, your function should return "Error!" string.
Your function must generate a string of the C programming code as follows:

Sequences of the X commands + or - must be replaced by \*p += X;\n or \*p -= X;\n.
Example:
"++++++++++" -> "\*p += 10;\n"
"------" -> "\*p -= 6;\n"
Sequences of the Y commands > or < must be replaced by p += Y;\n or p -= Y;\n.
Example:
">>>>>>>>>>" -> "p += 10;\n"
"<<<<<<" -> "p -= 6;\n"
. command must be replaced by putchar(\*p);\n.
Example:
".." -> "putchar(\*p);\nputchar(\*p);\n"
, command must be replaced by \*p = getchar();\n.
Example:
"," -> "\*p = getchar();\n"
[ command must be replaced by if (\*p) do {\n. ] command must be replaced by } while (\*p);\n.
Example:
"[>>]" ->
if (\*p) do {\n
  p += 2;\n
} while (\*p);\n
Each command in the code block must be shifted 2 spaces to the right accordingly to the previous code block.
Example:
"[>>[<<]]" ->
if (\*p) do {\n
  p += 2;\n
  if (\*p) do {\n
    p -= 2;\n
  } while (\*p);\n
} while (\*p);\n
Examples

Input:
+++++[>++++.<-]
Output:
*p += 5;
if (*p) do {
  p += 1;
  *p += 4;
  putchar(*p);
  p -= 1;
  *p -= 1;
} while (*p);

*/

function brainfuck_to_c(brainfuck){
    brainfuck = brainfuck.replace(/[^\+\-\<\>\,\.\[\]]/gm, '');
    if (brainfuck.split("[").length !== brainfuck.split("]").length) {
        return 'Error!';
    } do {
        brainfuck = brainfuck.replace(/\+\-|\-\+|\<\>|\>\<|\[\]/gm, '');
    } while ((brainfuck.includes('+-')||brainfuck.includes('-+')||brainfuck.includes('<>')||brainfuck.includes('><')||brainfuck.includes('[]')));
    brainfuck = brainfuck.replace(/\[/g, '[ ').replace(/\]/g, '] ').replace(/\./g, '. ').replace(/\,/g, ', ');
    var charsToBeNumeralized = ['+', '-', '<', '>'];
    for (i=0; i<charsToBeNumeralized.length; i++) {
        var lastIndexFound = -1;
        var regexstring = '\\'+charsToBeNumeralized[i]+'\\D';
        var regex = new RegExp(regexstring, 'g');
        do {
            var firstIndexHere = brainfuck.indexOf(charsToBeNumeralized[i], lastIndexFound+1);
            var lastIndexHere = firstIndexHere;
            var numberHere = 0;
            if (firstIndexHere > -1) {
                    lastIndexFound = firstIndexHere;
                    numberHere = 1;
                    for (z=firstIndexHere+1;z<brainfuck.length;z++) {
                        if (brainfuck[z]===charsToBeNumeralized[i]) {
                            numberHere++;
                            lastIndexHere = z;
                            lastIndexFound = z;
                        } else {
                            break;
                        }
                    } brainfuck = brainfuck.substring(0, firstIndexHere)+charsToBeNumeralized[i]+numberHere+' '+brainfuck.substring(lastIndexHere+1);
            }
        } while (brainfuck.replace(regex, '~').includes('~'))
    } brainfuck = brainfuck.trim().split(' ').map(term => [term[0], Number(term.substring(1))])
    var indent = '';
    var c = '';
    var bracketBalance = 0;
    for (m=0; m<brainfuck.length; m++) {
        switch (brainfuck[m][0]) {
            case '+':
                c += indent+'\*p += '+brainfuck[m][1]+';\n';
                break;
            case '-':
                c += indent+'\*p -= '+brainfuck[m][1]+';\n';
                break;
            case '>':
                c += indent+'p += '+brainfuck[m][1]+';\n';
                break;
            case '<':
                c += indent+'p -= '+brainfuck[m][1]+';\n';
                break;
            case '.':
                c += indent+'putchar(\*p);\n';
                break;
            case ',':
                c += indent+'\*p = getchar();\n';
                break;
            case '[':
                bracketBalance++;
                c += indent+'if (\*p) do {\n';
                indent += '  ';
                break;
            case ']':
                bracketBalance--;
                if (bracketBalance<0) {return 'Error!';}
                indent = indent.slice(0, -2);
                c += indent+'} while (\*p);\n';
        }
    } return c;
}