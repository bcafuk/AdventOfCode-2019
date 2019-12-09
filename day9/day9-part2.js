const readline = require('readline');
const Computer = require('../common/intcode.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', line => {
	const intCode = line.split(',').map(n => Number(n));
	
	const computer = new Computer(intCode);
	computer.enqueueInput(2);
	computer.runUntilHalt();
});
