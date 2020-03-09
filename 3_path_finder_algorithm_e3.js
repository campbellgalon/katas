/*

Level: 3 kyu

Description:

You are at start location [0, 0] in mountain area of NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return minimal number of climb rounds to target location [N-1, N-1]. Number of climb rounds between adjacent locations is defined as difference of location altitudes (ascending or descending).

Location altitude is defined as an integer number (0-9).

*/

function pathFinder(area) {
	if (area.length === 1) {
		return 0;
	}
	area = area.split('\n');
	var target = (area.length - 1) + ',' + (area[0].length - 1);
	var openArray = ['0,0'];
	var closedArray = [];
	var openCostArray = [0];

	function col(string) {
		return Number(string.substring(string.indexOf(',') + 1));
	}

	function row(string) {
		return Number(string.substring(0, string.indexOf(',')));
	}

	function getNeighbors(home) {
		var output = [];
		var maxSideIndex = area.length - 1;
		var homeCol = col(home);
		var homeRow = row(home);

		if (homeRow > 0) {
			output.push((homeRow - 1) + ',' + homeCol);
		}
		if (homeRow < maxSideIndex) {
			output.push((homeRow + 1) + ',' + homeCol);
		}
		if (homeCol > 0) {
			output.push(homeRow + ',' + (homeCol - 1));
		}
		if (homeCol < maxSideIndex) {
			output.push(homeRow + ',' + (homeCol + 1));
		}
		return output;
	}

	for (;;) {
		var lowestCost = Math.min(...openCostArray);
		var lowestCostIndex = 0;
		var lowestCostPosition = '';
		if (openCostArray.indexOf(lowestCost) === openCostArray.lastIndexOf(lowestCost)) {
			lowestCostIndex = openCostArray.indexOf(lowestCost);
			lowestCostPosition = openArray[lowestCostIndex];
			if (lowestCostPosition === target) {
				return lowestCost;
			}
		} else {
			var options = [];
			var worthiness = [];
			for (z = 0; z < openCostArray.length; z++) {
				if (openCostArray[z] === lowestCost) {
					options.push(openArray[z]);
					worthiness.push(row(openArray[z]) + col(openArray[z]));
				}
			}
			lowestCostPosition = options[worthiness.lastIndexOf(Math.max(...worthiness))];
			if (lowestCostPosition === target) {
				return lowestCost;
			}
			lowestCostIndex = openArray.indexOf(lowestCostPosition);
		}
		var lowestCostAltitude = Number(area[row(lowestCostPosition)][col(lowestCostPosition)]);
		openArray.splice(lowestCostIndex, 1);
		openCostArray.splice(lowestCostIndex, 1);
		closedArray.push(lowestCostPosition);
		var neighbors = getNeighbors(lowestCostPosition);
		for (i = 0; i < neighbors.length; i++) {
			if (openArray.indexOf(neighbors[i])>-1) {
				var newAltitude = Number(area[row(neighbors[i])][col(neighbors[i])]);
				var deltaAltitude = Math.abs(lowestCostAltitude - newAltitude);
				var existingIndex = openArray.indexOf(neighbors[i]);
				openCostArray[existingIndex] = Math.min(openCostArray[existingIndex], lowestCost + deltaAltitude);
			} else if (closedArray.indexOf(neighbors[i]) === -1) {
				var newAltitude = Number(area[row(neighbors[i])][col(neighbors[i])]);
				var deltaAltitude = Math.abs(lowestCostAltitude - newAltitude);
				openArray.push(neighbors[i]);
				openCostArray.push(lowestCost + deltaAltitude);
			}
		}
	}
}