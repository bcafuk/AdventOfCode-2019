const directions = [
	{x: 0, y: -1},
	{x: 0, y: 1},
	{x: -1, y: 0},
	{x: 1, y: 0},
];

class Area {
	constructor() {
		this.tiles = new Map();
	}

	getMapKey(x, y) {
		return x + ',' + y;
	}

	setTile(x, y, type) {
		this.tiles.set(this.getMapKey(x, y), type);
	}
	getTile(x, y) {
		return this.tiles.get(this.getMapKey(x, y));
	}

	floodFill(x, y, callback) {
		const visited = new Set([this.getMapKey(x, y)]);
		const queue = [{x, y, steps: []}];

		while (queue.length !== 0) {
			const pos = queue.shift();

			for (let i = 0; i < directions.length; ++i) {
				const neighbor = {
					x: pos.x + directions[i].x,
					y: pos.y + directions[i].y,
					steps: [...pos.steps, i],
				};

				const setKey = this.getMapKey(neighbor.x, neighbor.y);
				if (visited.has(setKey)) {
					continue;
				}

				const status = callback(neighbor);

				if (status === 'continue') {
					continue;
				} else if (status === 'return') {
					return;
				}

				visited.add(setKey);
				queue.push(neighbor);
			}
		}
	}

	search(x, y, target) {
		let found;

		const callback = neighbor => {
			const tile = this.getTile(neighbor.x, neighbor.y);

			if (tile === target) {
				found = neighbor;
				return 'return';
			} else if (tile === 0) {
				return 'continue';
			}
		};

		this.floodFill(x, y, callback);

		return found;
	}

	maxDist(x, y) {
		let maxDist = 0;

		const callback = neighbor => {
			const tile = this.getTile(neighbor.x, neighbor.y);

			if (tile === 0) {
				return 'continue';
			} else {
				maxDist = Math.max(maxDist, neighbor.steps.length);
			}
		};

		this.floodFill(x, y, callback);

		return maxDist;
	}
}

module.exports = {Area, directions};
