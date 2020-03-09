/*

Level: 4 kyu

Description:

You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return the minimal number of steps to exit position [N-1, N-1] if it is possible to reach the exit from the starting position. Otherwise, return false in JavaScript/Python and -1 in C++/C#/Java.

Empty positions are marked .. Walls are marked W. Start and exit positions are guaranteed to be empty in all test cases.

*/

function pathFinder(maze) {
    const matrix = maze.split`\n`.map(row => row.split``);
    const queue = [{ x: 0, y: 0, len: 0 }];
    const n = matrix.length - 1;
  
    while (queue.length) {
      const { x, y, len } = queue.shift();
      if (x == n && y == n) {
        return len;
      }
      matrix[x][y] = 'W';
      [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].forEach(([t1, t2]) => {
        if (matrix[t1] && matrix[t1][t2] && matrix[t1][t2] != 'W') {
          queue.push({x: t1, y: t2, len: len + 1});
          matrix[t1][t2] = 'W';
        }
      });
    }
    return false;
  }