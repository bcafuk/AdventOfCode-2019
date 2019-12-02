module.exports = (intCode, noun, verb) => {
	const codeCopy = [...intCode];

	codeCopy[1] = noun;
	codeCopy[2] = verb;
	
	let ip = 0;
	while (ip < codeCopy.length) {
		const [opcode, src1, src2, dest] = codeCopy.slice(ip, ip + 4);
		ip += 4;
			
		switch(opcode) {
			case 1:
				codeCopy[dest] = codeCopy[src1] + codeCopy[src2];
				break;
			case 2:
				codeCopy[dest] = codeCopy[src1] * codeCopy[src2];
				break;
			case 99:
				return codeCopy[0];
			default:
				return;
		}
	}
};
