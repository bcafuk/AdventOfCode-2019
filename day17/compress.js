const {hasPrefix} = require('./arrayUtils');

const transferWords = (words, data, compressed) => {
	/*
	 * Finds one of the words at the beginning of the data and appends its name to the compressed data.
	 * This is repeated as long as the data begins with one of the words.
	 */
	findWord: while (data.length > 0) {
		for (const [name, word] of words) {
			if (hasPrefix(data, word)) {
				data.splice(0, word.length);
				compressed.push(name);
				continue findWord;
			}
		}
		// None of the words were found, nothing more can be done with the given list of words
		return;
	}
};

const compressLevel = (data, compressed, words, remWords, maxLength) => {
	/*
	 * A recursive function that attempts to find a list of words that
	 * - compress the data completely,
	 * - are no longer than 20 characters, and
	 * - generate a routine that is no longer than 20 characters.
	 *
	 * data       - The remaining data to compress
	 * remWords   - Array of names of words that have not yet been generated
	 * compressed - The sequence of word names representing the part of the data that has already been compressed
	 * words      - An array of word definitions: the first element of a definition is the name, the second is the word
	 */
	if (remWords.length === 0) {
		// There are no more words left to generate, check if the current words have consumed all data
		if (data.length === 0) {
			// If they have, return them along with the compressed data
			return [compressed, ...(words.map(word => word[1]))];
		}
		// Otherwise, tell the upper level to keep looking
		return;
	}

	// Start the new word with length 1
	let length = 1;

	while (true) {
		const dataCopy = [...data];
		const compressedCopy = [...compressed];

		// The new word is at the beginning of the data
		const word = dataCopy.slice(0, length);
		if (word.join(',').length > maxLength) {
			/*
			 * If the word is too long, making it any longer by iterating further won't help; return to the upper level.
			 * Returning to the upper level discards both the newly generated word, and the word generated at
			 * the upper level. It also causes the upper level to try generating a word that is one character longer.
			 */
			return;
		}

		// Append the new word to the existing words and remove it from the list of words left to generate
		const newWords = [...words, [remWords[0], word]];
		const newRemWords = remWords.slice(1);
		// Compress the data as far as is possible with the current list of words
		transferWords(newWords, dataCopy, compressedCopy);

		if (compressed.join(',').length > maxLength) {
			// If the compressed routine is already too long, writing further to it won't help; return to the upper level
			// Returning has the same effects as what is described before the `return;` occurring a few lines earlier
			return;
		}

		// Attempt to find another word and compress further
		const result = compressLevel(dataCopy, compressedCopy, newWords, newRemWords, maxLength);

		// If the function found a list of words that compress all of the data, pass that list up to the upper level
		if (result !== undefined) {
			return result;
		}

		// Otherwise, discard the newly generated word and try with a word that is one character longer
		++length;
	}
};

const compress = (path, wordNames, maxLength) => {
	return compressLevel(path, [], [], wordNames, maxLength);
};

module.exports = compress;
