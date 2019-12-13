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

	const blocks = new Set();
	const getSetKey = (x, y) => x + ',' + y;

	while (true) {
		let next = iterator.next();
		if (next.done) {
			break;
		}
		const x = next.value;
		const y = iterator.next().value;
		const id = iterator.next().value;

		if (id === 2) {
			blocks.add(getSetKey(x, y));
		}
	}

	console.log(blocks.size);
});
