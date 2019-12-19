const readline = require('readline');
const Computer = require('../common/intcode');

const createBeamTest = callback => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.once('line', line => {
		const intCode = line.split(',').map(n => Number(n));

		const insideBeam = (x, y) => {
			const computer = new Computer(intCode);
			const iterator = computer.run();

			computer.enqueueInput(x);
			computer.enqueueInput(y);

			const next = iterator.next();
			return Boolean(next.value);
		};

		callback(insideBeam);
	});
};

module.exports = createBeamTest;
