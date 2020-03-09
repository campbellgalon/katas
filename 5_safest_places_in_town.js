/*

Level: 5 kyu

Description:

Laura Bassi was the first female professor at a European university.
Despite her immense intellect, she was not always allowed to lecture publicly.

One day a professor with very strong beliefs against women in academia sent some agents to find Bassi and end her career.

Help her escape by telling her the safest places in town!

Task
Implement the function advice(agents, n) where

agents is an array of agent coordinates.
n defines the size of the city that Bassi needs to hide in, in other words the side length of the square grid.
The function should return a list of coordinates that are the furthest away (by Manhattan distance) from all agents.

As an example, say you have a 6x6 map, and agents at locations

[[0, 0], [1, 5], [5, 1]]
The distances to the nearest agent look like this.



The safest spaces are the ones with distance 4, marked in bright red. So the function should return

[[2, 2], [3, 3], [4, 4], [5, 5]]
in any order.

Edge cases:

If there is an agent on every grid cell, there is no safe space, so return an empty list.
If there are no agents, then every cell is a safe spaces, so return all coordinates.
if n is 0, return an empty list.
If agent coordinates are outside of the map, they are simply not considered.
There are no duplicate agents on the same square.
Performance
There are 200 random tests with n <= 50. Inefficient solutions might time out.

This kata is inspired by ThoughtWorks' coding challenge

*/

function advice(agents, n) {

    function getAllIndexes(arr, val) {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    }

    var squares = [];
    var safety = [];

    for (i=0; i<n; i++) {
        for (j=0; j<n; j++) {
            safety.push(+Infinity);
            squares.push([i, j]);
        }
    }

    if (agents.length === 0) {
        return squares;
    } else {
        for (a=0; a<agents.length; a++) {
            if ((agents[a][0]>=0)&&(agents[a][0]<n)&&(agents[a][1]>=0)&&(agents[a][1]<n)) {
                for (s=0; s<squares.length; s++) {
                    var manhattan = Math.abs(agents[a][0] - squares[s][0]) + Math.abs(agents[a][1] - squares[s][1]);
                    if (safety[s]>manhattan) {
                        safety[s] = manhattan;
                    }
                }
            }
        }
    }

    if (Math.max(...safety)===0) {
        return [];
    } var safestIndexes = getAllIndexes(safety, Math.max(...safety));
    var safestSquares = [];
    for(z = 0; z < safestIndexes.length; z++) {
        safestSquares.push(squares[safestIndexes[z]]);
    } return safestSquares;
}