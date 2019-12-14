const primaryReactant = 'ORE';
const finalProduct = 'FUEL';

const countPrimary = (reactions, finalAmount) => {
	const balances = new Map([[primaryReactant, 0]]);
	for (const reaction of reactions) {
		balances.set(reaction[0], 0);
	}

	const adjustBalance = (name, amount) => balances.set(name, balances.get(name) + amount);

	const runReaction = (name, amount) => {
		if (name === primaryReactant) {
			adjustBalance(primaryReactant, -amount);
			return;
		}

		const reaction = reactions.get(name);

		const reactionAmount = Math.ceil((amount - balances.get(name)) / reaction.amount);
		if (reactionAmount <= 0) {
			return;
		}

		for (const reactant of reaction.reactants) {
			adjustBalance(reactant.name, -reactionAmount * reactant.coefficient);
			runReaction(reactant.name, 0);
		}
		adjustBalance(name, reactionAmount * reaction.amount);
	};

	runReaction(finalProduct, finalAmount);
	return -balances.get(primaryReactant);
};

module.exports = countPrimary;
