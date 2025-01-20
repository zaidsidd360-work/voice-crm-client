import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import NewIntegrationForm from "./NewIntegrationForm";
import Modal from "./Modal";

interface Integration {
	id: string;
	name: string;
	status: "active" | "inactive";
	type: "gohighlevel" | "airtable" | "zoho";
	createdAt: string;
}

const dummyIntegrations: Integration[] = [
	{
		id: "1",
		name: "GoHighLevel",
		status: "active",
		type: "gohighlevel",
		createdAt: "2024-01-01",
	},
	{
		id: "2",
		name: "Airtable",
		status: "active",
		type: "airtable",
		createdAt: "2024-01-02",
	},
];

const Integrations: React.FC = () => {
	const [integrations, setIntegrations] =
		useState<Integration[]>(dummyIntegrations);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCreateIntegration = async (data: {
		name: string;
		type: string;
	}) => {
		// Simulate API call
		const newIntegration: Integration = {
			id: Math.random().toString(),
			name: data.name,
			type: data.type as Integration["type"],
			status: "inactive",
			createdAt: new Date().toISOString(),
		};

		setIntegrations([...integrations, newIntegration]);
	};

	if (isLoading) {
		return (
			<div className="w-full h-[60vh] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-white/50" />
			</div>
		);
	}

	if (integrations.length === 0) {
		return (
			<div className="w-full h-[60vh] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 flex flex-col items-center justify-center">
				<p className="text-gray-400 mb-4">No integrations found</p>
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					<span>Create Integration</span>
				</button>
			</div>
		);
	}

	return (
		<div className="w-full h-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 relative">
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-3xl font-bold text-white">Integrations</h2>
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					<span>New Integration</span>
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{integrations.map((integration) => (
					<div
						key={integration.id}
						className="p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 bg-white/5"
					>
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-medium text-white">
								{integration.name}
							</h3>
							<span
								className={`px-2 py-1 rounded-full text-xs ${
									integration.status === "active"
										? "bg-green-500/10 text-green-500"
										: "bg-yellow-500/10 text-yellow-500"
								}`}
							>
								{integration.status}
							</span>
						</div>
						<p className="text-sm text-gray-400 mb-4">
							Type: {integration.type}
						</p>
						<p className="text-sm text-gray-400">
							Created:{" "}
							{new Date(
								integration.createdAt
							).toLocaleDateString()}
						</p>
					</div>
				))}
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Create New Integration"
			>
				<NewIntegrationForm
					onSubmit={handleCreateIntegration}
					onClose={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default Integrations;
