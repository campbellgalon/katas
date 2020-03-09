/*

Level: 4 kyu

Description:

You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return true if you can reach position [N-1, N-1] or false otherwise.

Empty positions are marked .. Walls are marked W. Start and exit positions are empty in all test cases.
*/

function pathFinder(maze){
    var accessibleSquares = ['0,0'];
    var checkedSquares = [];
    maze = maze.split('\n');
    function accessibleSquaresFrom(position) { 
        position = position.split(',').map(Number); 
        if(position[1]<maze[0].length-1){ 
            if((maze[position[0]][position[1]+1]==='.')&&(accessibleSquares.includes([position[0],position[1]+1])===false)){ 
                accessibleSquares.push(position[0]+','+(position[1]+1))};
        } if(position[1]>0){ 
            if((maze[position[0]][position[1]-1]==='.')&&(accessibleSquares.includes([position[0],position[1]-1])===false)){  
                accessibleSquares.push(position[0]+','+(position[1]-1))};
        } if(position[0]>0){ 
            if((maze[position[0]-1][position[1]]==='.')&&(accessibleSquares.includes([position[0]-1,position[1]])===false)){ 
                accessibleSquares.push((position[0]-1)+','+position[1])};
        } if(position[0]<maze[0].length-1){
            if((maze[position[0]+1][position[1]]==='.')&&(accessibleSquares.includes([position[0]+1,position[1]])===false)){  
                accessibleSquares.push((position[0]+1)+','+position[1])};
        } checkedSquares.push(position[0]+','+position[1]); 
    }
    for(i=0; i<accessibleSquares.length; i++){ 
        if (checkedSquares.includes(accessibleSquares[i])===false) {
            accessibleSquaresFrom(accessibleSquares[i]);
            if (accessibleSquares.includes(String(maze[0].length-1)+','+String(maze[0].length-1))) {return true}
        }
    } return accessibleSquares.includes(String(maze[0].length-1)+','+String(maze[0].length-1));
}