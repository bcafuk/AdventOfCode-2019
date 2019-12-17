const readline = require('readline');
const Computer = require('../common/intcode.js');
const {splitArray} = require('./arrayUtils.js');
const compress = require('./compress.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const getPath = dataField => {
	const height = dataField.length;
	const width = dataField[0].length;

	let robotPos;
	let robotDir;

	const inside = (dir) => {
		const x = robotPos.x + dir.x;
		const y = robotPos.y + dir.y;

		return (x >= 0 && x < width && y >= 0 && y < height);
	};

	// Find the robot in the field
	for (let y = 0; y < height; ++y) {
		for (let x = 0; x < width; ++x) {
			if (dataField[y][x] === '^') {
				robotPos = {x, y};
				robotDir = {x: 0, y: -1};
			} else if (dataField[y][x] === '>') {
				robotPos = {x, y};
				robotDir = {x: 1, y: 0};
			} else if (dataField[y][x] === 'v') {
				robotPos = {x, y};
				robotDir = {x: 0, y: 1};
			} else if (dataField[y][x] === '<') {
				robotPos = {x, y};
				robotDir = {x: -1, y: 0};
			}
		}
	}
	dataField[robotPos.y][robotPos.x] = '#';

	let path = [];
	let dist = 0;

	while (true) {
		const front = inside(robotDir) ? dataField[robotPos.y + robotDir.y][robotPos.x + robotDir.x] : '.';

		if (front === '#') {
			robotPos.x += robotDir.x;
			robotPos.y += robotDir.y;
			++dist;

		} else {
			if (dist !== 0) {
				path.push(dist);
				dist = 0;
			}

			const leftDir = {x: robotDir.y, y: -robotDir.x};
			const left = inside(leftDir) ? dataField[robotPos.y + leftDir.y][robotPos.x + leftDir.x] : '.';

			const rightDir = {x: -robotDir.y, y: robotDir.x};
			const right = inside(rightDir) ? dataField[robotPos.y + rightDir.y][robotPos.x + rightDir.x] : '.';

			if (left === '#') {
				robotDir = leftDir;
				path.push('L');
			} else if (right === '#') {
				robotDir = rightDir;
				path.push('R');
			} else {
				break;
			}
		}
	}

	return path;
};

rl.once('line', line => {
	const data = [];
	const inputFunction = computer => {
		// Remove the trailing newline
		data.pop();

		const dataField = splitArray(data, 10).map(arr => String.fromCharCode(...arr));
		const path = getPath(dataField);
		const compressedPath = compress(path, ['A', 'B', 'C'], 20);
		const compressedStrings = compressedPath.map(arr => arr.join(','));

		console.log(JSON.stringify(compressedStrings, null, 2));

		const input = compressedStrings.join('\n') + '\nn\n';

		for (const char of input) {
			computer.enqueueInput(char.charCodeAt(0));
		}
	};

	const intCode = line.split(',').map(n => Number(n));
	const computer = new Computer(intCode, inputFunction);
	const iterator = computer.run();

	computer.memorySet(0, 2);

	for (const output of iterator) {
		if (output < 128) {
			data.push(output);
		} else {
			console.log(output);
		}
	}
});
