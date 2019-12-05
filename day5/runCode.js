module.exports = (intCode, input, output) => {
	const codeCopy = [...intCode];
	
	let ip = 0;
	while (ip < codeCopy.length) {
		let instruction = codeCopy[ip];
		
		let opcode = instruction % 100;
		
		switch(opcode) {
			case 1:
			case 2:
			case 7:
			case 8: {
				let op1Mode = Math.trunc(instruction / 100) % 10;
				let op2Mode = Math.trunc(instruction / 1000) % 10;
				
				let op1 = codeCopy[ip + 1];
				let op2 = codeCopy[ip + 2];
				let dest = codeCopy[ip + 3];
				
				ip += 4;
				
				if (!op1Mode) {
					op1 = codeCopy[op1];
				}
				if (!op2Mode) {
					op2 = codeCopy[op2];
				}
				
				if (opcode == 1) {
					codeCopy[dest] = op1 + op2;
				} else if (opcode == 2) {
					codeCopy[dest] = op1 * op2;
				} else if (opcode == 7) {
					codeCopy[dest] = Number(op1 < op2);
				} else if (opcode == 8) {
					codeCopy[dest] = Number(op1 == op2);
				}
				break;
			}
			case 3: {
				let dest = codeCopy[ip + 1];
				
				ip += 2;
				
				codeCopy[dest] = input();
				break;
			}
			case 4: {
				let opMode = Math.trunc(instruction / 100) % 10;
				let op = codeCopy[ip + 1];
				
				ip += 2;
				
				if (!opMode) {
					op = codeCopy[op];
				}
				
				output(op);
				break;
			}
			case 5:
			case 6: {
				let op1Mode = Math.trunc(instruction / 100) % 10;
				let op2Mode = Math.trunc(instruction / 1000) % 10;
				
				let op1 = codeCopy[ip + 1];
				let op2 = codeCopy[ip + 2];
				
				ip += 3;
				
				if (!op1Mode) {
					op1 = codeCopy[op1];
				}
				if (!op2Mode) {
					op2 = codeCopy[op2];
				}
				
				if (
					(opcode == 5 && op1) ||
					(opcode == 6 && !op1)
				) {
					ip = op2;
				}
				break;
			}
			case 99:
				ip += 1;
				return;
			default:
				throw 'Unknown opcode ' + opcode;
		}
	}
};
