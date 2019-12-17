const loadReactions = require('./loadReactions');
const countPrimary = require('./countPrimary');

const primaryAmount = 1000000000000;

loadReactions(reactions => {
	let lo = 0;
	let hi = primaryAmount;

	let mid = Math.ceil((lo + hi) / 2);

	while (lo < hi) {
		const primaryUsed = countPrimary(reactions, mid);

		if (primaryUsed <= primaryAmount) {
			lo = mid;
		} else {
			hi = mid - 1;
		}

		mid = Math.ceil((lo + hi) / 2);
	}

	console.log(lo);
});
