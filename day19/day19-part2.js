const createBeamTest = require('./insideBeam');

createBeamTest(insideBeam => {
	let x = 99;
	let y = 0;

	while (!insideBeam(x, y)) {
		++y;
	}
	search: while (true) {
		while (insideBeam(x, y)) {
			if (insideBeam(x - 99, y + 99)) {
				break search;
			}
			++x;
		}
		--x;
		++y;
	}

	x -= 99;
	console.log(x * 10000 + y);
});
