class Amplifier {
	constructor(intCode) {
		this.codeCopy = [...intCode];
		this.inputQueue = [];
		this.ip = 0;
	}
	
	enqueueInput(input) {
		this.inputQueue.push(input);
	}
	
	run() {
		while (!this.halted) {
			let instruction = this.codeCopy[this.ip];
			
			let opcode = instruction % 100;
			
			switch(opcode) {
				case 1:
				case 2:
				case 7:
				case 8: {
					let op1Mode = Math.trunc(instruction / 100) % 10;
					let op2Mode = Math.trunc(instruction / 1000) % 10;
					
					let op1 = this.codeCopy[this.ip + 1];
					let op2 = this.codeCopy[this.ip + 2];
					let dest = this.codeCopy[this.ip + 3];
					
					this.ip += 4;
					
					if (!op1Mode) {
						op1 = this.codeCopy[op1];
					}
					if (!op2Mode) {
						op2 = this.codeCopy[op2];
					}
					
					if (opcode == 1) {
						this.codeCopy[dest] = op1 + op2;
					} else if (opcode == 2) {
						this.codeCopy[dest] = op1 * op2;
					} else if (opcode == 7) {
						this.codeCopy[dest] = Number(op1 < op2);
					} else if (opcode == 8) {
						this.codeCopy[dest] = Number(op1 == op2);
					}
					break;
				}
				case 3: {
					let dest = this.codeCopy[this.ip + 1];
					
					this.ip += 2;
					
					if (this.inputQueue.length === 0) {
						throw 'Input queue is empty';
					}
					
					this.codeCopy[dest] = this.inputQueue.shift();
					break;
				}
				case 4: {
					let opMode = Math.trunc(instruction / 100) % 10;
					let op = this.codeCopy[this.ip + 1];
					
					this.ip += 2;
					
					if (!opMode) {
						op = this.codeCopy[op];
					}
					
					this.halted = false;
					return op;
				}
				case 5:
				case 6: {
					let op1Mode = Math.trunc(instruction / 100) % 10;
					let op2Mode = Math.trunc(instruction / 1000) % 10;
					
					let op1 = this.codeCopy[this.ip + 1];
					let op2 = this.codeCopy[this.ip + 2];
					
					this.ip += 3;
					
					if (!op1Mode) {
						op1 = this.codeCopy[op1];
					}
					if (!op2Mode) {
						op2 = this.codeCopy[op2];
					}
					
					if (
						(opcode == 5 && op1) ||
						(opcode == 6 && !op1)
					) {
						this.ip = op2;
					}
					break;
				}
				case 99:
					this.ip += 1;
					this.halted = true;
					return;
				default:
					throw 'Unknown opcode ' + opcode;
			}
		}
	}
}
module.exports = Amplifier;
