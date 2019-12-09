const readline = require('readline');
const Computer = require('../common/intcode.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', line => {
	const intCode = line.split(',').map(n => Number(n));
	const noun = 12;
	const verb = 2;

	const computer = new Computer(intCode);
	computer.memorySet(1, noun);
	computer.memorySet(2, verb);

	computer.runUntilHalt();

	console.log(computer.memoryGet(0));
});
