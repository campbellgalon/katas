/*

Level: 3 kyu

Description:

Your Mission
Given a string containing the current state of the control crystals inner pathways (labeled as "X") and its gaps (labeled as "."), generate the shortest path from the start node (labeled as "S") to the goal node (labeled as "G") and return the new pathway (labeled with "P" characters).
If no solution is possible, return the string "Oh for crying out loud..." (in frustration).


The Rules
Nodes labeled as "X" are not traversable.
Nodes labeled as "." are traversable.
A pathway can be grown in eight directions (up, down, left, right, up-left, up-right, down-left, down-right), so diagonals are possible.
Nodes labeled "S" and "G" are not to be replaced with "P" in the case of a solution.
The shortest path is defined as the path with the shortest euclidiean distance going from one node to the next.
If several paths are possible with the same shortest distance, return any one of them.
Note that the mazes won't always be squares.


Example #1: Valid solution
.S...             .SP..
XXX..             XXXP.
.X.XX      =>     .XPXX
..X..             .PX..
G...X             G...X

Example #2: No solution
S....      
XX...      
...XX      =>     "Oh for crying out loud..."
.XXX.      
XX..G


Note: Your solution will have to be efficient because it will have to deal with a lot of maps and big ones.
Caracteristics of the random tests:

map sizes from 3x3 to 73x73 (step is 5 from one size to the other, mazes won't always be squares)
20 random maps for each size.
Overall, 311 tests to pass with the fixed ones.

*/

function wire_DHD_SG1(existingWires) {
	existingWires = existingWires.split('\n');
	var columnCount = existingWires[0].length;
  var rowCount = existingWires.length;
  var goalRow, goalCol, startRow, startCol;
  for (var g=0; g<rowCount; g++) {
    if (existingWires[g].includes('G')) {
      goalRow = g;
      goalCol = existingWires[g].indexOf('G');
      break;
    }
  } for (var s=0; s<columnCount; s++) {
    if (existingWires[s].includes('S')) {
      startRow = s;
      startCol = existingWires[s].indexOf('S');
      break;
    }
  }
  var startPosition = startRow + ',' + startCol;
  var goalPosition = goalRow + ',' + goalCol;
  var openArray = [startPosition];
  var openCosts = [0];
  var openParents = ['---'];
  var closedArray = [];
  var closedParents = [];

	function getTraversableNeighbors(position) {
    position = position.split(',').map(Number);
		var output = [];
		if ((position[0] > 0) && (position[0] < rowCount - 1) && (position[1] > 0) && (position[1] < columnCount - 1)) {
			var tempOutput = [(position[0] - 1) + ',' + (position[1] - 1), (position[0] - 1) + ',' + (position[1]), (position[0] - 1) + ',' + (position[1] + 1), (position[0]) + ',' + (position[1] - 1), (position[0]) + ',' + (position[1] + 1), (position[0] + 1) + ',' + (position[1] - 1), (position[0] + 1) + ',' + (position[1]), (position[0] + 1) + ',' + (position[1] + 1)];
			for (var i = 0; i < tempOutput.length; i++) {
				if (existingWires[Number(tempOutput[i].substring(0, tempOutput[i].indexOf(',')))][Number(tempOutput[i].substring(tempOutput[i].indexOf(',') + 1))] !== 'X') output.push(tempOutput[i]);
      };
		} else {
			if (position[0] > 0) {
				if (existingWires[position[0] - 1][position[1]] !== 'X') output.push((position[0] - 1) + ',' + (position[1]));
				if (position[1] > 0) {
					if (existingWires[position[0] - 1][position[1] - 1] !== 'X') output.push((position[0] - 1) + ',' + (position[1] - 1))
				}
				if (position[1] < columnCount - 1) {
					if (existingWires[position[0] - 1][position[1] + 1] !== 'X') output.push((position[0] - 1) + ',' + (position[1] + 1))
				}
			}
			if (position[0] < rowCount - 1) {
				if (existingWires[position[0] + 1][position[1]] !== 'X') output.push((position[0] + 1) + ',' + (position[1]));
				if (position[1] > 0) {
					if (existingWires[position[0] + 1][position[1] - 1] !== 'X') output.push((position[0] + 1) + ',' + (position[1] - 1));
				}
				if (position[1] < columnCount - 1) {
					if (existingWires[position[0] + 1][position[1] + 1] !== 'X') output.push((position[0] + 1) + ',' + (position[1] + 1));
				}
			}
			if (position[1] > 0) {
				if (existingWires[position[0]][position[1] - 1] !== 'X') output.push((position[0]) + ',' + (position[1] - 1));
			}
			if (position[1] < columnCount - 1) {
				if (existingWires[position[0]][position[1] + 1] !== 'X') output.push((position[0]) + ',' + (position[1] + 1));
			}
		} return output;
  }

  function delta(startPosition, endPosition) { //Euclidean
    startPosition = startPosition.split(',').map(Number);
    endPosition = endPosition.split(',').map(Number);
    return Math.sqrt((Math.abs(startPosition[0]-endPosition[0])**2) + (Math.abs(startPosition[1]-endPosition[1])**2));
  }

  function h(position) {
    return delta(position, goalPosition);
  }

  function breadCrumbs(position) {
    position = position.split(',').map(Number);
    existingWires[position[0]] = existingWires[position[0]].substring(0, position[1])+'P'+existingWires[position[0]].substring(position[1]+1);
  }

  while (openArray.length>0) {
    var lowestCost = Math.min(...openCosts);
    var lowestCostIndex = openCosts.indexOf(lowestCost);
    var lowestCostPosition = openArray.splice(lowestCostIndex, 1)[0];
    closedArray.push(lowestCostPosition);
    openCosts.splice(lowestCostIndex, 1);
    closedParents.push(openParents.splice(lowestCostIndex, 1)[0]);
    var neighbors = getTraversableNeighbors(lowestCostPosition);
    for (n=0; n<neighbors.length; n++) {
      if(closedArray.includes(neighbors[n])===false) {
        if(openArray.includes(neighbors[n])===false) {
        openArray.push(neighbors[n]);
        openParents.push(lowestCostPosition);
        openCosts.push(lowestCost + 1000*delta(lowestCostPosition, neighbors[n]) + h(neighbors[n]));
        } else {
          var oldIndex = openArray.indexOf(neighbors[n])
          var oldCost = openCosts[oldIndex];
          var newCost = lowestCost + 1000*delta(lowestCostPosition, neighbors[n]) + h(neighbors[n]);
          if (newCost < oldCost) {
            openCosts[oldIndex] = newCost;
            openParents[oldIndex] = lowestCostPosition;
          }
        }
      }
    } if (closedArray.includes(goalPosition)) {
      var lastTouched = goalPosition;
      var path = [];
      for (;;) {
        var next = closedParents[closedArray.indexOf(lastTouched)];
        if(next === startPosition) {
          for (var x = 0; x < path.length; x++) {
            breadCrumbs(path[x]);
          } return existingWires.join('\n');
        }
        path.push(next);
        lastTouched = next;
      }
    }
  } return 'Oh for crying out loud...';
}