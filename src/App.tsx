import { useEffect, useState } from "react";
import "./App.css";
import CreateIntegration from "./components/CreateIntegration";
import FetchIntegration from "./components/FetchIntegration";
import IntegrationList from "./components/IntegrationList";
import UpdateIntegration from "./components/UpdateIntegrations";
import { IntegrationData, dummyData } from "./dummyData";

function App() {
	const [integrationData, setIntegrationData] = useState<IntegrationData[]>(
		[]
	);

	useEffect(() => {
		setIntegrationData(dummyData);
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-8 p-4">
			<h1 className="text-2xl font-bold text-gray-700">
				Integration Management
			</h1>
			<CreateIntegration
				integrationData={integrationData}
				setIntegrationData={setIntegrationData}
			/>
			<UpdateIntegration />
			<FetchIntegration />
			<IntegrationList integrationData={integrationData} />
		</div>
	);
}

export default App;
