const splitArray = (array, value) => {
	const result = [];
	let currentSection = [];

	array = [...array];

	while (array.length > 0) {
		const element = array.shift();

		if (element === value) {
			result.push(currentSection);
			currentSection = [];
		} else {
			currentSection.push(element);
		}
	}
	if (currentSection.length > 0) {
		result.push(currentSection);
	}

	return result;
};

const hasPrefix = (array, prefix) => {
	if (prefix.length > array.length) {
		return false;
	}
	for (let i = 0; i < prefix.length; ++i) {
		if (prefix[i] !== array[i]) {
			return false;
		}
	}
	return true;
};

module.exports = {splitArray, hasPrefix};
