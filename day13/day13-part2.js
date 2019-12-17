const readline = require('readline');
const Computer = require('../common/intcode');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const blocks = new Set();
	const getSetKey = (x, y) => x + ',' + y;

	let ballX;
	let paddleX;

	const inputFunction = () => Math.sign(ballX - paddleX);

	const intCode = line.split(',').map(n => Number(n));

	const computer = new Computer(intCode, inputFunction);
	const iterator = computer.run();

	computer.memorySet(0, 2);

	let score = 0;

	while (true) {
		let next = iterator.next();
		if (next.done) {
			break;
		}
		const x = next.value;
		const y = iterator.next().value;
		const id = iterator.next().value;

		if (x === -1 && y === 0) {
			score = id;
			if (blocks.size === 0) {
				break;
			}
		} else {
			const setKey = getSetKey(x, y);
			if (id === 2) {
				blocks.add(setKey);
			} else {
				blocks.delete(setKey);
			}

			if (id === 3) {
				paddleX = x;
			} else if (id === 4) {
				ballX = x;
			}
		}
	}

	console.log(score);
});
