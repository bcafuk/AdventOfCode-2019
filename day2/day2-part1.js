const readline = require('readline');
const runCode = require('./runCode.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', line => {
	const intCode = line.split(',').map(n => Number(n));
	const noun = 12;
	const verb = 2;
	
	console.log(runCode(intCode, noun, verb));
});
