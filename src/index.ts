import { HTML_TEMPLATE } from "./generated-src/generated";

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api") {
			return handleApiRequest(url);
		}

		return handleHtmlRequest();
	},
};

// API Route: Generates a username based on user input
async function handleApiRequest(url: URL): Promise<Response> {
	const appendTTV = url.searchParams.get("appendTTV") === "true";
	const numDigits = parseInt(url.searchParams.get("numDigits") || "4", 10);
	const nameLength = parseInt(url.searchParams.get("nameLength") || "4", 10);

	const username = generateName(nameLength, numDigits, appendTTV);

	return new Response(JSON.stringify({ username }), {
		headers: { "Content-Type": "application/json" },
	});
}

// HTML Route: Serves the username generator page
async function handleHtmlRequest(): Promise<Response> {
	const defaultUsername = generateName(4, 4, false);

	const html = HTML_TEMPLATE.replace("{{USERNAME}}", defaultUsername);

	return new Response(html, {
		headers: { "Content-Type": "text/html" },
	});
}

// Function to generate a username
function generateName(nameLength: number, numDigits: number, appendTTV: boolean): string {
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
