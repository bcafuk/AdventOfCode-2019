const readline = require('readline');

const stringToIngredient = string => {
	const [coefficient, name] = string.split(' ');
	return {
		coefficient: Number(coefficient),
		name: name,
	};
};

const loadReactions = callback => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	const reactions = new Map();

	rl.on('line', line => {
		if (line === '') {
			return;
		}

		const [reactantString, productString] = line.split(' => ');

		const reactants = reactantString.split(', ').map(stringToIngredient);
		const product = stringToIngredient(productString);

		const reaction = {
			amount: product.coefficient,
			reactants: reactants,
		};

		reactions.set(product.name, reaction);
	});

	rl.on('close', () => {
		callback(reactions);
	});
};

module.exports = loadReactions;
