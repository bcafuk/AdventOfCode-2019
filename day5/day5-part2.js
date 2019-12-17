const readline = require('readline');
const Computer = require('../common/intcode');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const intCode = line.split(',').map(n => Number(n));

	const computer = new Computer(intCode);
	computer.enqueueInput(5);
	computer.runUntilHalt();
});
