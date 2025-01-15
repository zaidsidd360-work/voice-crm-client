import { IntegrationData } from "../dummyData";

const IntegrationList = ({
	integrationData,
}: {
	integrationData: IntegrationData[];
}) => {
	return (
		<div className="p-6 bg-white shadow rounded-lg">
			<h2 className="text-lg font-semibold mb-4 text-gray-900">
				All Integrations
			</h2>
			<div className="overflow-auto max-h-96">
				<table className="w-full text-left text-gray-900">
					<thead>
						<tr>
							<th className="border-b-2 p-2">User ID</th>
							<th className="border-b-2 p-2">Retell API Key</th>
							{/* <th className="border-b-2 p-2">Vapi API Key</th> */}
							<th className="border-b-2 p-2">Airtable API Key</th>
							{/* <th className="border-b-2 p-2">GHL API Key</th> */}
						</tr>
					</thead>
					<tbody>
						{integrationData.map((data, index) => (
							<tr key={index} className="hover:bg-gray-100">
								<td className="border-b p-2">{data.userId}</td>
								<td className="border-b p-2">
									{data.retellApiKey}
								</td>
								<td className="border-b p-2">
									{data.vapiApiKey}
								</td>
								<td className="border-b p-2">
									{data.airtableApiKey}
								</td>
								<td className="border-b p-2">
									{data.ghlApiKey}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default IntegrationList;
