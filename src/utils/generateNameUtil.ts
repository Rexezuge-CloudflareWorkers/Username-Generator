export function generateName(nameLength: number, numDigits: number, appendTTV: boolean): string {
	const vowels = ['a', 'e', 'i', 'o', 'u'];
	const consonants = ['b', 'c', 'd', 'f', 'g', 'j', 'k', 'l', 'm', 'n', 'p',
		'q', 's', 't', 'v', 'x', 'z', 'h', 'r', 'w', 'y'];

	let name = "";

	// Generate consonant-vowel pairs
	for (let i = 0; i < nameLength; i++) {
		let consonant = consonants[Math.floor(Math.random() * consonants.length)];
		let vowel = vowels[Math.floor(Math.random() * vowels.length)];

		// Capitalize first letter
		if (i === 0) {
			consonant = consonant.toUpperCase();
		}

		name += consonant + vowel;
	}

	// Append random numbers
	let randomNumbers = "";
	for (let i = 0; i < numDigits; i++) {
		randomNumbers += Math.floor(Math.random() * 10);
	}

	let finalName = name + randomNumbers;

	if (appendTTV) {
		finalName += "_TTV";
	}

	return finalName;
}
