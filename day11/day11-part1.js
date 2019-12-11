const readline = require('readline');
const Computer = require('../common/intcode.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const intCode = line.split(',').map(n => Number(n));

	const computer = new Computer(intCode);
	const iterator = computer.run();

	const panels = new Map();
	const getMapKey = pos => pos.x + ',' + pos.y;

	let robotPos = {
		x: 0,
		y: 0,
	};
	let robotDir = {
		x: 0,
		y: -1,
	};

	while (true) {
		const mapKey = getMapKey(robotPos);

		let input = panels.get(mapKey);
		if (input === undefined) {
			input = 0;
		}

		computer.enqueueInput(input);

		let next = iterator.next();
		if (next.done) {
			break;
		}
		const color = next.value;
		panels.set(mapKey, color);

		next = iterator.next();
		if (next.done) {
			break;
		}
		const turn = next.value;

		if (turn) {
			robotDir = {
				x: -robotDir.y,
				y: robotDir.x,
			};
		} else {
			robotDir = {
				x: robotDir.y,
				y: -robotDir.x,
			};
		}

		robotPos.x += robotDir.x;
		robotPos.y += robotDir.y;
	}

	console.log(panels.size);
});
