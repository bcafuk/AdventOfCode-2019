const readline = require('readline');
const Computer = require('../common/intcode');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const computerCount = 50;
	const natAddress = 255;
	const failedReadLimit = 2;

	const intCode = line.split(',').map(n => Number(n));

	const network = [];
	const nat = {
		x: undefined,
		y: undefined,
		previousY: undefined,
	};

	const createInputFunction = address => {
		return () => {
			if (network[address].inputBuffer.length === 0) {
				++network[address].failedReads;
				return -1;
			}
			return network[address].inputBuffer.shift();
		};
	};

	for (let i = 0; i < computerCount; ++i) {
		const inputFunction = createInputFunction(i);
		const computer = new Computer(intCode, inputFunction);
		computer.inputQueue.push(i);

		network[i] = {
			computer,
			inputBuffer: [],
			outputBuffer: [],
			failedReads: 0,
		};
	}

	while (true) {
		for (const device of network) {
			const output = device.computer.runOneCycle();

			if (output !== undefined) {
				device.outputBuffer.push(output);
			}

			while (device.outputBuffer.length >= 3) {
				const [address, x, y] = device.outputBuffer.splice(0, 3);
				device.failedReads = 0;

				if (address === natAddress) {
					nat.x = x;
					nat.y = y;
				} else {
					network[address].failedReads = 0;
					network[address].inputBuffer.push(x, y);
				}
			}
		}

		let networkIdle = true;
		for (const device of network) {
			if (device.failedReads < failedReadLimit) {
				networkIdle = false;
				break;
			}
		}
		if (networkIdle) {
			network[0].failedReads = 0;
			network[0].inputBuffer.push(nat.x, nat.y);
			if (nat.y !== nat.previousY) {
				nat.previousY = nat.y;
			} else {
				break;
			}
		}
	}

	console.log(nat.y);
});
