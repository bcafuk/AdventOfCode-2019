const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const vault = [];

const getGraph = () => {
	const gridAdjacent = [
		{x: -1, y: 0},
		{x: 1, y: 0},
		{x: 0, y: -1},
		{x: 0, y: 1},
	];
	const height = vault.length;
	const width = vault[0].length;
	const getSetKey = (x, y) => x + ',' + y;

	const nodes = [];
	for (let y = 0; y < height; ++y) {
		for (let x = 0; x < width; ++x) {
			if (vault[y][x] !== '#' && vault[y][x] !== '.') {
				const node = {x, y, cell: vault[y][x], edges: []};
				if (vault[y][x] === '@') {
					nodes.unshift(node);
				} else {
					nodes.push(node);
				}
			}
		}
	}

	const findNode = (x, y) => {
		for (let i = 0; i < nodes.length; ++i) {
			if (nodes[i].x === x && nodes[i].y === y) {
				return i;
			}
		}
	};

	for (const start of nodes) {
		const visited = new Set([getSetKey(start.x, start.y)]);
		const queue = [{x: start.x, y: start.y, dist: 0}];

		while (queue.length !== 0) {
			const pos = queue.shift();

			for (const direction of gridAdjacent) {
				const newPos = {
					x: pos.x + direction.x,
					y: pos.y + direction.y,
					dist: pos.dist + 1,
				};
				if (newPos.x < 0 || newPos.x >= width || newPos.y < 0 || newPos.y >= height) {
					// Outside the vault, I don't expect this to be possible
					continue;
				}

				const newCell = vault[newPos.y][newPos.x];
				if (newCell === '#') {
					// Wall
					continue;
				}

				const setKey = getSetKey(newPos.x, newPos.y);
				if (visited.has(setKey)) {
					continue;
				}
				visited.add(setKey);

				if (newCell.match(/[a-zA-Z]/)) {
					const neighborId = findNode(newPos.x, newPos.y);
					start.edges.push([neighborId, newPos.dist]);

					continue;
				}

				queue.push(newPos);
			}
		}
	}

	return nodes;
};

const findTargets = (graph, startTarget) => {
	const [startId, startDist, keys] = startTarget;
	const targets = [];

	const distances = Array(graph.length).fill(Infinity);
	distances[startId] = startDist;
	const unvisited = new Set([...Array(graph.length).keys()]);

	while (unvisited.size !== 0) {
		let id = -1;
		for (const node of unvisited) {
			if (id === -1 || distances[node] < distances[id]) {
				id = node;
			}
		}
		unvisited.delete(id);
		const node = graph[id];

		if (node.cell.match(/[a-z]/) && !keys.has(node.cell)) {
			const newKeys = new Set(keys);
			newKeys.add(node.cell);
			targets.push([id, distances[id], newKeys]);
			continue;
		}

		for (const edge of node.edges) {
			if (!unvisited.has(edge[0])) {
				continue;
			}
			const newNode = graph[edge[0]];

			if (newNode.cell.match(/[A-Z]/) && !keys.has(newNode.cell.toLowerCase())) {
				// Door for which the key has not yet been obtained
				continue;
			}

			const alt = distances[id] + edge[1];
			if (alt < distances[edge[0]]) {
				distances[edge[0]] = alt;
			}
		}
	}

	return targets;
};

rl.on('line', line => {
	if (line === '') {
		return;
	}
	vault.push([...line]);
});

rl.on('close', () => {
	const graph = getGraph();

	let keyCount = 0;
	for (const node of graph) {
		if (node.cell.match(/[a-z]/)) {
			++keyCount;
		}
	}

	const initialTarget = [0, 0, new Set()];

	const getSetKey = target => target[0] + ',' + target[1] + ';' + [...target[2]].sort().join(',');

	let minDist = Infinity;
	const visited = new Set([getSetKey(initialTarget)]);

	const search = targets => {
		for (const target of targets) {
			if (target[1] >= minDist) {
				continue;
			}

			if (target[2].size === keyCount) {
				minDist = target[1];
				console.log('Current minimum: ' + minDist);
				continue;
			}

			const setKey = getSetKey(target);
			if (visited.has(setKey)) {
				continue;
			}
			visited.add(setKey);

			const newTargets = findTargets(graph, target);
			search(newTargets);
		}
	};

	search(findTargets(graph, initialTarget));
	console.log(minDist);
});
