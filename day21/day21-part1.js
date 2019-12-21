const runBot = require('./runBot');

const program =
	'OR A J\n' +
	'AND B J\n' +
	'AND C J\n' +
	'NOT J J\n' +
	'AND D J\n' +
	'WALK\n';
runBot(program, damage => console.log(damage), drawing => console.error(drawing));
