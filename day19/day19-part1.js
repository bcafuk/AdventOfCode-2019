const createBeamTest = require('./insideBeam');

createBeamTest(insideBeam => {
	let count = 0;
	for (let y = 0; y < 50; ++y) {
		for (let x = 0; x < 50; ++x) {
			if (insideBeam(x, y)) {
				++count;
			}
		}
	}
	console.log(count);
});
