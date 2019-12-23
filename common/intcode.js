const defaultInputFunction = () => {};

class Computer {
	constructor(intCode, inputFunction = defaultInputFunction) {
		this.codeCopy = [...intCode];
		this.inputQueue = [];
		this.inputFunction = inputFunction;
		this.ip = 0;
		this.relativeBase = 0;
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

	parameterGet(index) {
		const instructionString = String(this.memoryGet(this.ip));
		const mode = Number(instructionString.charAt(instructionString.length - 3 - index));

		const parameter = this.memoryGet(this.ip + 1 + index);

		switch (mode) {
			case 0: // Position mode
				return this.memoryGet(parameter);
			case 1: // Immediate mode
				return parameter;
			case 2: // Relative mode
				return this.memoryGet(parameter + this.relativeBase);
			default:
				throw 'Unknown source mode ' + mode;
		}
	}

	parameterSet(index, value) {
		const instructionString = String(this.memoryGet(this.ip));
		const mode = Number(instructionString.charAt(instructionString.length - 3 - index));

		const parameter = this.memoryGet(this.ip + 1 + index);

		switch (mode) {
			case 0: // Position mode
				this.memorySet(parameter, value);
				break;
			case 2: // Relative mode
				this.memorySet(parameter + this.relativeBase, value);
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

	runOneCycle() {
		if (this.halted) {
			return;
		}

		const instruction = this.memoryGet(this.ip);

		const opcode = instruction % 100;

		switch (opcode) {
			case 1: {
				let op1 = this.parameterGet(0);
				let op2 = this.parameterGet(1);
				this.parameterSet(2, op1 + op2);

				this.ip += 4;
				return;
			}
			case 2: {
				let op1 = this.parameterGet(0);
				let op2 = this.parameterGet(1);
				this.parameterSet(2, op1 * op2);

				this.ip += 4;
				return;
			}
			case 3: {
				if (this.inputQueue.length === 0) {
					const input = this.inputFunction(this);
					if (input !== undefined) {
						this.enqueueInput(input);
					}

					if (this.inputQueue.length === 0) {
						throw 'Input queue is empty';
					}
				}

				this.parameterSet(0, this.inputQueue.shift());

				this.ip += 2;
				return;
			}
			case 4: {
				let op = this.parameterGet(0);

				this.ip += 2;
				return op;
			}
			case 5: {
				let op1 = this.parameterGet(0);
				let op2 = this.parameterGet(1);

				if (op1 !== 0) {
					this.ip = op2;
				} else {
					this.ip += 3;
				}
				return;
			}
			case 6: {
				let op1 = this.parameterGet(0);
				let op2 = this.parameterGet(1);

				if (op1 === 0) {
					this.ip = op2;
				} else {
					this.ip += 3;
				}
				return;
			}
			case 7: {
				let op1 = this.parameterGet(0);
				let op2 = this.parameterGet(1);
				this.parameterSet(2, Number(op1 < op2));

				this.ip += 4;
				return;
			}
			case 8: {
				let op1 = this.parameterGet(0);
				let op2 = this.parameterGet(1);
				this.parameterSet(2, Number(op1 === op2));

				this.ip += 4;
				return;
			}
			case 9: {
				const op = this.parameterGet(0);
				this.relativeBase += op;

				this.ip += 2;
				return;
			}
			case 99: {
				this.ip += 1;
				this.halted = true;
				return;
			}
			default: {
				throw 'Unknown opcode ' + opcode;
			}
		}
	}

	* run() {
		while (!this.halted) {
			const output = this.runOneCycle();

			if (output !== undefined) {
				yield output;
			}
		}
	}
}

module.exports = Computer;
