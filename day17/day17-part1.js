const readline = require('readline');
const Computer = require('../common/intcode');
const {splitArray} = require('./arrayUtils');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.once('line', line => {
	const intCode = line.split(',').map(n => Number(n));

	const computer = new Computer(intCode);
	const iterator = computer.run();

	const data = [];
	for (const output of iterator) {
		data.push(output);
	}
	data.pop();

	const dataField = splitArray(data, 10).map(arr => String.fromCharCode(...arr));

	const height = dataField.length;
	const width = dataField[0].length;

	let sum = 0;

	for (let y = 1; y < height - 1; ++y) {
		for (let x = 1; x < width - 1; ++x) {
			if (
				dataField[y][x] === '#' &&
				dataField[y - 1][x] === '#' &&
				dataField[y + 1][x] === '#' &&
				dataField[y][x - 1] === '#' &&
				dataField[y][x + 1] === '#'
			) {
				sum += x * y;
			}
		}
	}

	console.log(sum);
});
