const loadReactions = require('./loadReactions');
const countPrimary = require('./countPrimary');

loadReactions(reactions => {
	console.log(countPrimary(reactions, 1));
});
