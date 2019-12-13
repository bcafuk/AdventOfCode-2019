const defaultInputFunction = () => {
	throw 'Input queue is empty';
};

class Computer {
	constructor(intCode, inputFunction = defaultInputFunction) {
		this.codeCopy = [...intCode];
		this.inputQueue = [];
		this.inputFunction = inputFunction;
	}

	enqueueInput(input) {
		this.inputQueue.push(input);
	}

	memoryGet(address) {
		if (this.codeCopy[address] === undefined) {
			return 0;
		}
		return this.codeCopy[address];
	}

	memorySet(address, value) {
		this.codeCopy[address] = value;
	}

	parameterGet(address, relativeBase, index) {
		const instructionString = String(this.memoryGet(address));
		const mode = Number(instructionString.charAt(instructionString.length - 3 - index));

		const parameter = this.memoryGet(address + 1 + index);

		switch (mode) {
			case 0: // Position mode
				return this.memoryGet(parameter);
			case 1: // Immediate mode
				return parameter;
			case 2: // Relative mode
				return this.memoryGet(parameter + relativeBase);
			default:
				throw 'Unknown source mode ' + mode;
		}
	}

	parameterSet(address, relativeBase, index, value) {
		const instructionString = String(this.memoryGet(address));
		const mode = Number(instructionString.charAt(instructionString.length - 3 - index));

		const parameter = this.memoryGet(address + 1 + index);

		switch (mode) {
			case 0: // Position mode
				this.memorySet(parameter, value);
				break;
			case 2: // Relative mode
				this.memorySet(parameter + relativeBase, value);
				break;
			default:
				throw 'Unknown destination mode ' + mode;
		}
	}

	runUntilHalt() {
		const iterator = this.run();

		for (const output of iterator) {
			console.log(output);
		}
	}

	* run() {
		let ip = 0;
		let relativeBase = 0;

		while (true) {
			const instruction = this.memoryGet(ip);

			const opcode = instruction % 100;

			switch (opcode) {
				case 1: {
					let op1 = this.parameterGet(ip, relativeBase, 0);
					let op2 = this.parameterGet(ip, relativeBase, 1);
					this.parameterSet(ip, relativeBase, 2, op1 + op2);

					ip += 4;
					break;
				}
				case 2: {
					let op1 = this.parameterGet(ip, relativeBase, 0);
					let op2 = this.parameterGet(ip, relativeBase, 1);
					this.parameterSet(ip, relativeBase, 2, op1 * op2);

					ip += 4;
					break;
				}
				case 3: {
					if (this.inputQueue.length === 0) {
						this.enqueueInput(this.inputFunction(this));
					}

					this.parameterSet(ip, relativeBase, 0, this.inputQueue.shift());

					ip += 2;
					break;
				}
				case 4: {
					let op = this.parameterGet(ip, relativeBase, 0);

					ip += 2;
					yield op;
					break;
				}
				case 5: {
					let op1 = this.parameterGet(ip, relativeBase, 0);
					let op2 = this.parameterGet(ip, relativeBase, 1);

					if (op1 !== 0) {
						ip = op2;
					} else {
						ip += 3;
					}
					break;
				}
				case 6: {
					let op1 = this.parameterGet(ip, relativeBase, 0);
					let op2 = this.parameterGet(ip, relativeBase, 1);

					if (op1 === 0) {
						ip = op2;
					} else {
						ip += 3;
					}
					break;
				}
				case 7: {
					let op1 = this.parameterGet(ip, relativeBase, 0);
					let op2 = this.parameterGet(ip, relativeBase, 1);
					this.parameterSet(ip, relativeBase, 2, Number(op1 < op2));

					ip += 4;
					break;
				}
				case 8: {
					let op1 = this.parameterGet(ip, relativeBase, 0);
					let op2 = this.parameterGet(ip, relativeBase, 1);
					this.parameterSet(ip, relativeBase, 2, Number(op1 === op2));

					ip += 4;
					break;
				}
				case 9: {
					const op = this.parameterGet(ip, relativeBase, 0);
					relativeBase += op;

					ip += 2;
					break;
				}
				case 99: {
					ip += 1;
					return;
				}
				default: {
					throw 'Unknown opcode ' + opcode;
				}
			}
		}
	}
}

module.exports = Computer;
