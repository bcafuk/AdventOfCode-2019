const readline = require('readline');
const runCode = require('./runCode.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', line => {
	const intCode = line.split(',').map(n => Number(n));
	
	runCode(intCode, () => 1, n => console.log(n));
});
