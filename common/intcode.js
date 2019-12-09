class Computer {
	constructor(intCode) {
		this.codeCopy = [...intCode];
		this.inputQueue = [];
		this.ip = 0;
		this.relativeBase = 0;
	}

	enqueueInput(input) {
		this.inputQueue.push(input);
	}

	get(index) {
		if (this.codeCopy[index] === undefined) {
			return 0;
		}
		return this.codeCopy[index];
	}

	set(index, value) {
		this.codeCopy[index] = value;
	}

	runUntilHalt() {
		const iterator = this.run();

		for (const output of iterator) {
			console.log(output);
		}
	}

	* run() {
		while (true) {
			let instruction = this.get(this.ip);

			let opcode = instruction % 100;

			switch (opcode) {
				case 1:
				case 2:
				case 7:
				case 8: {
					let op1Mode = Math.trunc(instruction / 100) % 10;
					let op2Mode = Math.trunc(instruction / 1000) % 10;
					let destMode = Math.trunc(instruction / 10000) % 10;

					let op1 = this.get(this.ip + 1);
					let op2 = this.get(this.ip + 2);
					let dest = this.get(this.ip + 3);

					this.ip += 4;

					switch (op1Mode) {
						case 0:
							op1 = this.get(op1);
							break;
						case 1:
							break;
						case 2:
							op1 = this.get(op1 + this.relativeBase);
							break;
						default:
							throw 'Unknown parameter mode ' + op1Mode;
					}
					switch (op2Mode) {
						case 0:
							op2 = this.get(op2);
							break;
						case 1:
							break;
						case 2:
							op2 = this.get(op2 + this.relativeBase);
							break;
						default:
							throw 'Unknown parameter mode ' + op2Mode;
					}
					switch (destMode) {
						case 0:
							break;
						case 2:
							dest = dest + this.relativeBase;
							break;
						default:
							throw 'Unknown destination mode ' + destMode;
					}

					if (opcode === 1) {
						this.set(dest, op1 + op2)
					} else if (opcode === 2) {
						this.set(dest, op1 * op2)
					} else if (opcode === 7) {
						this.set(dest, Number(op1 < op2))
					} else if (opcode === 8) {
						this.set(dest, Number(op1 === op2))
					}
					break;
				}
				case 3: {
					let destMode = Math.trunc(instruction / 100) % 10;
					let dest = this.get(this.ip + 1);

					this.ip += 2;

					switch (destMode) {
						case 0:
							break;
						case 2:
							dest = dest + this.relativeBase;
							break;
						default:
							throw 'Unknown destination mode ' + destMode;
					}

					if (this.inputQueue.length === 0) {
						throw 'Input queue is empty';
					}

					this.set(dest, this.inputQueue.shift())
					break;
				}
				case 4: {
					let opMode = Math.trunc(instruction / 100) % 10;
					let op = this.get(this.ip + 1);

					this.ip += 2;

					switch (opMode) {
						case 0:
							op = this.get(op);
							break;
						case 1:
							break;
						case 2:
							op = this.get(op + this.relativeBase);
							break;
						default:
							throw 'Unknown parameter mode ' + opMode;
					}

					yield op;
					break;
				}
				case 5:
				case 6: {
					let op1Mode = Math.trunc(instruction / 100) % 10;
					let op2Mode = Math.trunc(instruction / 1000) % 10;

					let op1 = this.get(this.ip + 1);
					let op2 = this.get(this.ip + 2);

					this.ip += 3;

					switch (op1Mode) {
						case 0:
							op1 = this.get(op1);
							break;
						case 1:
							break;
						case 2:
							op1 = this.get(op1 + this.relativeBase);
							break;
						default:
							throw 'Unknown parameter mode ' + op1Mode;
					}
					switch (op2Mode) {
						case 0:
							op2 = this.get(op2);
							break;
						case 1:
							break;
						case 2:
							op2 = this.get(op2 + this.relativeBase);
							break;
						default:
							throw 'Unknown parameter mode ' + op2Mode;
					}

					if (
						(opcode === 5 && op1) ||
						(opcode === 6 && !op1)
					) {
						this.ip = op2;
					}
					break;
				}
				case 9: {
					let opMode = Math.trunc(instruction / 100) % 10;
					let op = this.get(this.ip + 1);

					this.ip += 2;

					switch (opMode) {
						case 0:
							op = this.get(op);
							break;
						case 1:
							break;
						case 2:
							op = this.get(op + this.relativeBase);
							break;
						default:
							throw 'Unknown parameter mode ' + opMode;
					}

					this.relativeBase += op;
					break;
				}
				case 99:
					this.ip += 1;
					return;
				default:
					throw 'Unknown opcode ' + opcode;
			}
		}
	}
}

module.exports = Computer;
