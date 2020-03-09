/*

Level: 4 kyu

Description:

You have to write a function that gets an input as either a string or a number and returns the minimum number of coins required to make such an amount.

You have to use British currency, considering only the broadly used coins, that is pound coins (1£ and 2£) and penny coins (50p, 20p, 10p, 5p, 2p, 1p).


Rules for the input you will get:

Currency is going to be given, if in string format, with a certain English format: the "£" symbol may come first (and in this case assume that the value is in pounds), the "p" symbol may come last - any other position for them is just wrong; if an integer with no symbols is given, assume it is a value in pennies; if a float with no symbol is given, assume it is a value in pounds and round it to the second decimal (ie: do not count fractions of pennies: 1.257422457p==1.26p).

To make it even more clear: if the input starts with a pound symbol ("£" in most languages, "L" in Ruby unless I can get to make it display UFT-8 chars) or if the number is a float, the value is in pounds, otherwise consider it as pennies.

Expected output format:

Output has to be formatted in decreasing weight/nominal value of coins, with the last two elements (if two or more) separated by and "and", the rest separeted by commas and the correct plurals, like this:

minCoins("4p") == "2 2p coins"
minCoins("11p") == "1 10p coin and 1 1p coin"
minCoins(456) == "2 £2 coins, 1 50p coin, 1 5p coin and 1 1p coin"
If an input is invalid for any reason (invalid characters, misplaced characters, negative numbers and so on), considering it equivalent to 0 pennies, so you have to return a null/None/nil value.

minCoins("L200") == "Invalid input - enter a positive amount of money"
minCoins("2£1p") == "Invalid input - enter a positive amount of money"
minCoins("54pp") == "Invalid input - enter a positive amount of money"
minCoins("-21p") == "Invalid input - enter a positive amount of money"
minCoins("£21£") == "Invalid input - enter a positive amount of money"
minCoins("4.2.") == "Invalid input - enter a positive amount of money"
minCoins("2£0p") == "Invalid input - enter a positive amount of money"
Be ready for A LOT of edge cases to test this last condition.

Notes and tips: particularly for beginners, be sure that you understand fully well the problem; if I may advice, don't take the problem as a whole, but split it into lesser problems and then solve them progressively, putting together the solution (an approach that it is called divide-and-conquer in computer science).

You will need at least 3 main parts and you may think of creating 3 different support functions for each task instead of using a massive bloated function to solve it all.

You will need to:

parse the given input, filtering out invalid strings and taking into account if the figures are in pound or pennis;
translate it all into the lesser number of coins you can use;
create a reply string and return it.
Part I could be the more difficult if you are not familiar with regexes: if this is the case, read carefully my description of the format above and try to tranlate it into a regex - feel free to ask in the comment if you need some help or tip for learning them!

Part II is relatively easy once you figure out how you could have the least possible amount of coins.

Parte III maybe tricky, particularly for edge cases, but if you work well in the previous parts, you should be able to handle it.

Note on currency: I was given most of the test cases by a British man, so I assume most of them make some sense, despite being rather "edgy"; if they don't, just pretend they do for practice's sake :D.

*/

function minCoins(amount){
    function validate(amount){
        amount = String(amount);
        var acceptable = ['£','1','2','3','4','5','6','7','8','9','0','.','p'];
        var output = 1;
        if ((amount.length===0)||(amount.match(/0|1|2|3|4|5|6|7|8|9/)===null)||((amount.length===1)&&((amount==='p')||(amount==='£')||(amount==='.')))){
            return false;
        } for (i=0; i<amount.length; i++) {
            if(acceptable.includes(amount[i]) === false) {
                return false;
            }
        } if (amount.includes('p')) {
            if (amount.indexOf('p')!==(amount.length-1)) {
                return false;
            } else {
                amount = amount.slice(0, -1);
            }
        } if (amount.includes('£')) {
                if(amount.lastIndexOf('£')!==0) {
                    return false;
                } else {
                    amount = amount.slice(1);
                    if (amount.includes('.') === false) {
                        output = 100;
                    }
                }
        } if (amount.includes('.')) {
            if ((amount.split('.').length > 2)||(amount.split('.')[0]==='')||(amount.split('.')[1]==='')) {
                return false;
            } amount = String(Number(amount).toFixed(2)).split('.');
            if (amount.length === 2) {
                if (amount[0].length === 0) {
                    amount = amount[1];
                } else if (amount[1].length === 0) {
                    amount = String(100*Number(amount[1]));
                } else {
                amount = String(Number(amount[1]) + (100*Number(amount[0])));
                }
            }
        } return Number(amount)*output
    } var output = [];
    var denominations = [200, 100, 50, 20, 10, 5, 2, 1];
    var coinsUsed = [0, 0, 0, 0, 0, 0, 0, 0];
    var pluralDesc = [' £2 coins',' £1 coins',' 50p coins',' 20p coins',' 10p coins',' 5p coins',' 2p coins',' 1p coins'];
    var singleDesc = [' £2 coin',' £1 coin',' 50p coin',' 20p coin',' 10p coin',' 5p coin',' 2p coin',' 1p coin'];
    amount = validate(amount);
    if (amount === false) {
        return "Invalid input - enter a positive amount of money";
    } else {
        for (i=0; i<denominations.length; i++) {
            var thisDenomCount = (amount-(amount % denominations[i]))/denominations[i];
            coinsUsed[i] = thisDenomCount;
            amount -= denominations[i]*thisDenomCount;
        }
    } for (i=0; i<coinsUsed.length; i++) {
        if(coinsUsed[i]>0) {
            if(coinsUsed[i]>1) {
                output.push(coinsUsed[i]+pluralDesc[i]);
            } else {
                output.push(coinsUsed[i]+singleDesc[i]);
            }
        }
    } output = output.join(', ');
    if (output.includes(',')){
    output = output.substring(0, output.lastIndexOf(',')) + ' and' + output.substring(output.lastIndexOf(',')+1)
    } return output;
}