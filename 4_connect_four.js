/*

Level: 4 kyu

Description:

Connect Four
Take a look at wiki description of Connect Four game.

The grid is 6 row by 7 columns, those being named from A to G.

You will receive a list of strings showing the order of the pieces which dropped in columns:

alt text

  piecesPositionList = ["A_Red",
                        "B_Yellow",
                        "A_Red",
                        "B_Yellow",
                        "A_Red",
                        "B_Yellow",
                        "G_Red",
                        "B_Yellow"]
The list may contain up to 42 moves and shows the order the players are playing.

The first player who connects four items of the same color is the winner.

You should return "Yellow", "Red" or "Draw" accordingly.

*/

function whoIsWinner(piecesPositionList) {
	var board = [
		[' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ']
	];
	var columnNameIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

	function logBoard() {
		console.log('A|B|C|D|E|F|G\n' + board[0].join('|') + '\n' + board[1].join('|') + '\n' + board[2].join('|') + '\n' + board[3].join('|') + '\n' + board[4].join('|') + '\n' + board[5].join('|') + '\n');
	}

	function getColumnArray() {
		var output = [];
		for (b = 0; b < board[0].length; b++) {
			output.push([board[0][b], board[1][b], board[2][b], board[3][b], board[4][b], board[5][b], ]);
		}
		return output;
	}

	function boardCheck() {
		for (i = 0; i < board.length; i++) { //4 in a row checker
			if (board[i].join('').includes('RRRR')) {
				return 'Red';
			} else if (board[i].join('').includes('YYYY')) {
				return 'Yellow';
			}
		}
		var columnStatus = getColumnArray();
		for (j = 0; j < columnStatus.length; j++) { //4 in a column checker
			if (columnStatus[j].join('').includes('RRRR')) {
				return 'Red';
			} else if (columnStatus[j].join('').includes('YYYY')) {
				return 'Yellow';
			}
		}
		for (r = 0; r < board.length; r++) { //4 in any diagonal checker
			for (c = 0; c < columnStatus.length; c++) {
				if (board[r][c] === 'R') {
					if (board[r - 1] && board[r + 1]) {
						if (board[r + 2]) {
							if ((board[r - 1][c - 1] === 'R') && (board[r + 1][c + 1] === 'R')) { //top left and bottom right
								if (board[r + 2][c + 2] === 'R') {
									return 'Red';
								}
							}
							if ((board[r - 1][c + 1] === 'R') && (board[r + 1][c - 1] === 'R')) { //top right and bottom left
								if (board[r + 2][c - 2] === 'R') {
									return 'Red';
								}
							}
						}
						if (board[r - 2]) {

							if ((board[r - 1][c - 1] === 'R') && (board[r + 1][c + 1] === 'R')) { //top left and bottom right
								if (board[r - 2][c - 2] === 'R') {
									return 'Red';
								}

							}
							if ((board[r - 1][c + 1] === 'R') && (board[r + 1][c - 1] === 'R')) { //top right and bottom left
								if (board[r - 2][c + 2] === 'R') {
									return 'Red';
								}
							}
						}
					}
				} else if (board[r][c] === 'Y') {
					if (board[r - 1] && board[r + 1]) {
						if (board[r + 2]) {
							if ((board[r - 1][c - 1] === 'Y') && (board[r + 1][c + 1] === 'Y')) { //top left and bottom right
								if (board[r + 2][c + 2] === 'Y') {
									return 'Yellow';
								}
							}
						}
						if (board[r - 2]) {

							if ((board[r - 1][c + 1] === 'Y') && (board[r + 1][c - 1] === 'Y')) { //top right and bottom left
								if (board[r - 2][c + 2] === 'Y') {
									return 'Yellow';
								}
							}
						}
					}
				}
			}
		}
		return 'Draw';
	}
	for (z = 0; z < piecesPositionList.length; z++) {
		var column = columnNameIndex.indexOf(piecesPositionList[z][0]);
		var color = piecesPositionList[z][2];
		for (y = board.length - 1; y >= 0; y--) {
			if (board[y][column] === ' ') {
				board[y][column] = color;
				break;
			}
		}
		var thisResult = boardCheck();
		if (thisResult !== 'Draw') {
			logBoard();
			return thisResult;
		}
	}
	logBoard();
	return 'Draw';
}