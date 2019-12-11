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

	panels.set(getMapKey(robotPos), 1);

	const imageBounds = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
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

		imageBounds.left = Math.min(imageBounds.left, robotPos.x);
		imageBounds.top = Math.min(imageBounds.top, robotPos.y);
		imageBounds.right = Math.max(imageBounds.right, robotPos.x);
		imageBounds.bottom = Math.max(imageBounds.bottom, robotPos.y);
	}

	let output = '';
	for (let y = imageBounds.top; y <= imageBounds.bottom; ++y) {
		for (let x = imageBounds.left; x <= imageBounds.right; ++x) {
			if (panels.get(getMapKey({x, y}))) {
				output += '#';
			} else {
				output += ' ';
			}
		}
		output += '\n';
	}

	console.log(output);
});
