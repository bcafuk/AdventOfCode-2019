const runBot = require('./runBot');

const program =
	'OR A J\n' +
	'AND B J\n' +
	'AND C J\n' +
	'NOT J J\n' +
	'AND D J\n' +
	'OR H T\n' +
	'OR E T\n' +
	'AND T J\n' +
	'RUN\n';
runBot(program, damage => console.log(damage), drawing => console.error(drawing));
