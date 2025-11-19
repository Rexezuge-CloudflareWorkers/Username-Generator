import { useState, useEffect } from 'react';

function App() {
	const [username, setUsername] = useState('Loading...');
	const [copyIcon, setCopyIcon] = useState('📋');
	const [appendTTV, setAppendTTV] = useState(false);
	const [numDigits, setNumDigits] = useState(4);
	const [nameLength, setNameLength] = useState(4);

	const fetchUsername = async () => {
		try {
			const backendUrl = import.meta.env.VITE_OPTIONAL_BACKEND_URL || '';
			const baseUrl = backendUrl ? backendUrl : '';
			const params = new URLSearchParams({
				appendTTV: appendTTV.toString(),
				numDigits: numDigits.toString(),
				nameLength: nameLength.toString(),
			});

			const response = await fetch(`${baseUrl}/api?${params}`);
			const data = await response.json();
			setUsername(data.username || 'Error fetching username');
		} catch (error) {
			console.error('Error fetching username:', error);
			setUsername('Error fetching username');
		}
	};

	useEffect(() => {
		fetchUsername();
	}, []);

	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopyIcon('✔');
				setTimeout(() => setCopyIcon('📋'), 2000);
			})
			.catch((err) => {
				console.error('Failed to copy username:', err);
			});
	};

	return (
		<div className="flex flex-col items-center p-5 min-h-screen bg-gray-50">
			<div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
				<h2 className="text-2xl font-bold text-center mb-6">
					Username Generator
				</h2>

				<div className="mb-6">
					<label className="block mb-2 font-semibold text-gray-700">
						Generated Username:
					</label>
					<div className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 font-mono text-sm break-all flex items-center justify-between">
						<span className="flex-grow">{username}</span>
						<button
							onClick={() => copyToClipboard(username)}
							className="ml-3 text-2xl hover:bg-gray-200 p-1 rounded"
						>
							{copyIcon}
						</button>
					</div>
				</div>

				<button
					onClick={fetchUsername}
					className="w-full mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Generate New Username
				</button>

				<div className="mb-4">
					<label className="block mb-2 font-semibold text-gray-700">
						<input
							type="checkbox"
							checked={appendTTV}
							onChange={(e) => setAppendTTV(e.target.checked)}
							className="mr-2"
						/>
						Append "_TTV"
					</label>
				</div>

				<div className="mb-4">
					<label className="block mb-2 font-semibold text-gray-700">
						Number of digits: {numDigits}
					</label>
					<input
						type="range"
						min="0"
						max="10"
						value={numDigits}
						onChange={(e) => setNumDigits(parseInt(e.target.value))}
						className="w-full"
					/>
				</div>

				<div className="mb-4">
					<label className="block mb-2 font-semibold text-gray-700">
						Username length (pairs of letters): {nameLength}
					</label>
					<input
						type="range"
						min="1"
						max="6"
						value={nameLength}
						onChange={(e) => setNameLength(parseInt(e.target.value))}
						className="w-full"
					/>
				</div>
			</div>

			<div className="mt-8 text-center">
				<p className="text-gray-600">
					For more details on the API, please visit the{' '}
					<a
						href={`${import.meta.env.VITE_OPTIONAL_BACKEND_URL || ''}/docs`}
						target="_blank"
						className="text-blue-600 hover:underline"
					>
						OpenAPI documentation
					</a>
					.
				</p>
			</div>
		</div>
	);
}

export default App;
