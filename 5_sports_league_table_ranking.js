/*

Level: 5 kyu

Description:

Description
You organize a sports league in a round-robin-system. Each team meets all other teams. In your league a win gives a team 2 points, a draw gives both teams 1 point. After some games you have to compute the order of the teams in your league. You use the following criteria to arrange the teams:

Points
Scoring differential (the difference between goals scored and those conceded)
Goals scored
First you sort the teams by their points. If two or more teams reached the same number of points, the second criteria comes into play and so on. Finally, if all criteria are the same, the teams share a place.

Input
number: Number of teams in your league.
games: An array of arrays. Each item represents a played game with an array of four elements [TeamA,TeamB,GoalA,GoalB] (TeamA played against TeamB and scored GoalA goals and conceded GoalB goals ).
Output
positions: An array of positions. The i-th item should be the position of the i-th team in your league.
Example
number = 6
games = [[0, 5, 2, 2],   // Team 0 - Team 5 => 2:2
         [1, 4, 0, 2],   // Team 1 - Team 4 => 0:2
         [2, 3, 1, 2],   // Team 2 - Team 3 => 1:2
         [1, 5, 2, 2],   // Team 1 - Team 5 => 2:2
         [2, 0, 1, 1],   // Team 2 - Team 0 => 1:1
         [3, 4, 1, 1],   // Team 3 - Team 4 => 1:1
         [2, 5, 0, 2],   // Team 2 - Team 5 => 0:2
         [3, 1, 1, 1],   // Team 3 - Team 1 => 1:1
         [4, 0, 2, 0]]   // Team 4 - Team 0 => 2:0
You may compute the following table:

Rank	Team	For : Against	GD	Points
1.	Team 4	5 : 1	+4	5
2.	Team 5	6 : 4	+2	4
3.	Team 3	4 : 3	+1	4
4.	Team 0	3 : 5	-2	2
4.	Team 1	3 : 5	-2	2
6.	Team 2	2 : 5	-3	1
Team 5 and Team 3 reached the same number of points. But since Team 5 got a better scoring differential, it ranks better than Team 3. All values of Team 0 and Team 1 are the same, so these teams share the fourth place.

In this example you have to return the array [4, 4, 6, 3, 1, 2].
*/

const mysort = t => Object.entries(t).sort((t, e) => e[1] - t[1]);
let j = new Set;

function table(t, e, o) {
	const n = {};
	for (let e = 0; e < t; e++) n[e] = 0;
	for (let [t, r, s, c] of e) o.has(t) && o.has(r) && (n[t] += 1e9 * (s > c ? 2 : s == c ? 1 : 0) + 1e4 * (s - c) + s, n[r] += 1e9 * (s < c ? 2 : s == c ? 1 : 0) + 1e4 * (c - s) + c);
	return n
}

function group(t) {
	const e = {};
	for (const [o, n] of t) 0 !== n && (e[n] || (e[n] = []), e[n].push(o));
	return Object.values(e)
}

function compute(t, e, o, n, r = t) {
	const s = table(o, n, new Set(t.map(t => +t))),
		c = mysort(s).filter(e => t.includes(e[0])),
		l = c.map(t => t[1]);
	let f = 0,
		u = c[0][1];
	for (let o = 0; o < c.length; o++) e.includes(c[o][0]) && (t.includes(c[o][0]) ? (u !== c[o][1] && (f = o, u = c[o][1]), j[c[o][0]] += f) : r.includes(c[o][0]) || (j[c[o][0]] += 1));
	if (1 !== new Set(l).size)
		for (const t of group(c, s)) t.length > 1 && compute(t, e, o, n, c.filter(t => t[1] > l.slice(-1)[0]).map(t => t[0]))
}

function computeRanks(t, e) {
	j = {};
	const o = new Set;
	for (const [t, n, r, s] of e) o.add(t), o.add(n), j[t] = 0, j[n] = 0;
	const n = mysort(table(t, e, o)),
		r = group(n, e);
	for (const o of r) o.length > 1 && compute(o, o, t, e);
	let s = 1,
		c = n[0][1],
		l = Array(t).fill(0);
	for (let o = 0; o < t; o++) c !== n[o][1] && (s = o + 1, c = n[o][1]), l[+n[o][0]] = s + (e[0] && void 0 !== e[0][2] && j[n[o][0]] || 0);
	return l
}