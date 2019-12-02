const readline = require('readline');
const runCode = require('./runCode.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', line => {
	const intCode = line.split(',').map(n => Number(n));
	const expectedOutput = 19690720;
	
	for (let noun = 0; noun < 100; ++noun) {
		for (let verb = 0; verb < 100; ++verb) {
			const actualOutput = runCode(intCode, noun, verb)
			if (actualOutput === expectedOutput) {
				console.log(100 * noun + verb);
				return;
			}
		}
	}
});
