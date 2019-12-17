const readline = require('readline');
const Computer = require('../common/intcode');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const intCode = line.split(',').map(n => Number(n));
	const expectedOutput = 19690720;

	for (let noun = 0; noun < 100; ++noun) {
		for (let verb = 0; verb < 100; ++verb) {
			const computer = new Computer(intCode);
			computer.memorySet(1, noun);
			computer.memorySet(2, verb);

			computer.runUntilHalt();

			const actualOutput = computer.memoryGet(0);
			if (actualOutput === expectedOutput) {
				console.log(100 * noun + verb);
				return;
			}
		}
	}
});
