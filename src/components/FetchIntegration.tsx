import { useState } from "react";
import { getIntegration } from "../api/integrationApi";

const FetchIntegration = () => {
	const [userId, setUserId] = useState("");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [integrationData, setIntegrationData] = useState<any>(null);

	const handleFetch = async () => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = (await getIntegration(userId)) as any;
			setIntegrationData(response.data.integration);
		} catch (error) {
			console.error("Error fetching integration:", error);
		}
	};

	return (
		<div className="p-6 bg-white shadow rounded-lg">
			<h2 className="text-lg font-semibold mb-4">Fetch Integration</h2>
			<input
				type="text"
				placeholder="User ID"
				onChange={(e) => setUserId(e.target.value)}
				className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
			/>
			<button
				onClick={handleFetch}
				className="w-full bg-indigo-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-indigo-600"
			>
				Fetch Integration
			</button>
			{integrationData && (
				<div className="mt-4">
					<h3 className="text-lg font-semibold">
						Integration Details
					</h3>
					<pre className="bg-gray-100 p-4 rounded-lg text-black">
						{JSON.stringify(integrationData, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
};

export default FetchIntegration;
