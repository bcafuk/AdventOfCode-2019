const readline = require('readline');
const Computer = require('../common/intcode.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const intCode = line.split(',').map(n => Number(n));

	let maxOutput = -Infinity;
	for (let perm = 0; perm < 120; ++perm) {
		const phases = [];

		{
			let n = perm;
			const phaseList = [5, 6, 7, 8, 9];

			for (let i = 5; i > 0; --i) {
				const phase = phaseList.splice(n % i, 1)[0];
				phases.push(phase);
				n = Math.floor(n / i);
			}
		}

		let output = 0;

		let amplifiers = [];
		for (let i = 0; i < 5; ++i) {
			const computer = new Computer(intCode);
			const iterator = computer.run();
			computer.enqueueInput(phases[i]);
			amplifiers[i] = {computer, iterator};
		}

		feedbackLoop: while (true) {
			for (let i = 0; i < 5; ++i) {
				amplifiers[i].computer.enqueueInput(output);
				let next = amplifiers[i].iterator.next();
				if (next.done) {
					break feedbackLoop;
				}
				output = next.value;
			}
		}

		maxOutput = Math.max(maxOutput, output);
	}

	console.log(maxOutput);
});
