/*

Level: 4 kyu

Description:

None given, it is necessary to determine the input syntax and desired output through manipulation of the given test cases.

*/

const map = {r:1, R: 2, l: 3, L: 2}
const ways = x => [[-x,0],[0,x],[x,0],[0,-x]]

let way = 0;
let coords=[0,0];

function IamHere(path){
  if (path.length == 0)
    return coords;
  path = path.replace(/^\d+/, a => {
    let [dx, dy] = ways(+a)[way % 4]
    coords[0] += dx;
    coords[1] += dy;
    return "";
  })
  path = path.replace(/^[rRlL]/, a => {
    way += map[a]
    return "";
  })
  
  return IamHere(path)
}