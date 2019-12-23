const readline = require('readline');
const Computer = require('../common/intcode');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const computerCount = 50;
	const natAddress = 255;

	const intCode = line.split(',').map(n => Number(n));

	const inputFunction = () => -1;
	const computers = [];
	const outputBuffers = [];

	for (let i = 0; i < computerCount; ++i) {
		const computer = new Computer(intCode, inputFunction);
		computer.inputQueue.push(i);

		computers[i] = computer;
		outputBuffers[i] = [];
	}

	poll: while (true) {
		for (let i = 0; i < computerCount; ++i) {
			const output = computers[i].runOneCycle();

			if (output !== undefined) {
				outputBuffers[i].push(output);
			}

			while (outputBuffers[i].length >= 3) {
				const [address, x, y] = outputBuffers[i].splice(0, 3);

				if (address === natAddress) {
					console.log(y);
					break poll;
				}

				computers[address].inputQueue.push(x, y);
			}
		}
	}
});
