const readline = require('readline');
const Computer = require('../common/intcode');
const {Area, directions} = require('./Area');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const intCode = line.split(',').map(n => Number(n));

	let dir;
	let steps = [];
	const area = new Area();
	let droidPos = {x: 0, y: 0};
	let systemPos;

	const inputFunction = () => {
		if (steps.length === 0) {
			const unexplored = area.search(droidPos.x, droidPos.y, undefined);

			if (unexplored !== undefined) {
				steps = unexplored.steps;
			} else {
				const dist = area.maxDist(systemPos.x, systemPos.y);
				console.log(dist);
				process.exit(0);
			}
		}

		dir = steps.shift();
		return dir + 1;
	};

	const computer = new Computer(intCode, inputFunction);
	const iterator = computer.run();

	while (true) {
		let next = iterator.next();
		if (next.done) {
			break;
		}
		const tile = next.value;

		const newDroidPos = {
			x: droidPos.x + directions[dir].x,
			y: droidPos.y + directions[dir].y,
		};

		area.setTile(newDroidPos.x, newDroidPos.y, tile);
		if (tile !== 0) {
			droidPos = newDroidPos;
		}
		if (tile === 2) {
			systemPos = droidPos;
		}
	}
});
