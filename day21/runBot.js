const readline = require('readline');
const Computer = require('../common/intcode');

const runBot = (program, success, failure) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.once('line', line => {
		const intCode = line.split(',').map(n => Number(n));

		const computer = new Computer(intCode);
		const iterator = computer.run();

		for (const char of program) {
			computer.enqueueInput(char.charCodeAt(0));
		}

		let screen = '';
		for (const output of iterator) {
			if (output < 128) {
				screen += String.fromCharCode(output);
			} else {
				success(output);
				return;
			}
		}
		failure(screen);
	});
};

module.exports = runBot;
