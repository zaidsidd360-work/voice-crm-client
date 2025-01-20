import React, { useState } from "react";
import { Plus, Loader2, PenTool } from "lucide-react";
import NewIntegrationForm from "./NewIntegrationForm";
import Modal from "./Modal";
import { VapiTool } from "./Profile";
import { Database, CalendarClock, Server } from "lucide-react";
import GHL from "../assets/ghlLogo.jpg";
import Airtable from "../assets/airtableLogo.png";

interface Integration {
	id: string;
	name: string;
	status: "active" | "inactive";
	type: "gohighlevel" | "airtable";
	createdAt: string;
	updatedAt?: string;
	vapiTool: VapiTool;
	metadata?: {
		apiKey?: string;
		baseId?: string; // for Airtable
		accountId?: string; // for GoHighLevel
		workspaceId?: string; // for Zoho
	};
}

const dummyIntegrations: Integration[] = [
	{
		id: "1",
		name: "My GoHighLevel Integration",
		status: "active",
		type: "gohighlevel",
		createdAt: new Date().toISOString(),
		vapiTool: {
			id: "vapi-1",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			type: "function",
			function: {
				name: "goHighLevelTool",
				async: true,
				description: "Integration with GoHighLevel CRM",
				parameters: {
					type: "object",
					properties: {
						action: {
							description: "The action to perform",
							type: "string",
						},
					},
					required: ["action"],
				},
			},
			messages: [],
			orgId: "org-1",
			server: {
				url: "https://api.gohighlevel.com",
				timeoutSeconds: 30,
			},
			async: true,
		},
		metadata: {
			apiKey: "ghl_123456",
			accountId: "acc_789",
		},
	},
	{
		id: "2",
		name: "Project Tracker Airtable",
		status: "active",
		type: "airtable",
		createdAt: new Date().toISOString(),
		vapiTool: {
			id: "vapi-2",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			type: "function",
			function: {
				name: "airtableProjectTool",
				async: true,
				description: "Integration with Airtable Project Management",
				parameters: {
					type: "object",
					properties: {
						baseId: {
							description: "The Airtable base ID",
							type: "string",
						},
						tableName: {
							description: "The table name to interact with",
							type: "string",
						},
					},
					required: ["baseId", "tableName"],
				},
			},
			messages: [],
			orgId: "org-1",
			server: {
				url: "https://api.airtable.com",
				timeoutSeconds: 30,
			},
			async: true,
		},
		metadata: {
			apiKey: "pat_123456",
			baseId: "appXXXXXXXXXXXXXX",
		},
	},
	{
		id: "3",
		name: "Customer Database Airtable",
		status: "active",
		type: "airtable",
		createdAt: new Date().toISOString(),
		vapiTool: {
			id: "vapi-3",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			type: "function",
			function: {
				name: "airtableCustomerTool",
				async: true,
				description: "Integration with Airtable Customer Database",
				parameters: {
					type: "object",
					properties: {
						baseId: {
							description: "The Airtable base ID",
							type: "string",
						},
						view: {
							description: "The view to query",
							type: "string",
						},
					},
					required: ["baseId"],
				},
			},
			messages: [],
			orgId: "org-1",
			server: {
				url: "https://api.airtable.com",
				timeoutSeconds: 30,
			},
			async: true,
		},
		metadata: {
			apiKey: "pat_789012",
			baseId: "appYYYYYYYYYYYYYY",
		},
	},
];

const logos = {
	gohighlevel: GHL,
	airtable: Airtable,
};

const Integrations: React.FC = () => {
	const [integrations, setIntegrations] =
		useState<Integration[]>(dummyIntegrations);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	console.log(setIsLoading);

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
			vapiTool: {
				id: `vapi-${Math.random().toString()}`,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				type: "function",
				function: {
					name: `${data.type}Tool`,
					async: true,
					description: `Integration with ${data.type} service`,
					parameters: {
						type: "object",
						properties: {},
						required: [],
					},
				},
				messages: [],
				orgId: "org-1",
				server: {
					url: `https://api.${data.type}.com`,
					timeoutSeconds: 30,
				},
				async: true,
			},
			metadata: {},
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
		<div className="w-full h-full overflow-y-auto rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 relative">
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{integrations.map((integration) => (
					<div
						key={integration.id}
						className="p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 bg-white/5"
					>
						<div className="flex items-start gap-4 mb-6">
							<img
								src={
									logos[
										integration.type
									] as keyof typeof logos
								}
								alt={integration.type}
								className="w-12 h-12 rounded-lg bg-white/5 p-2"
							/>
							<div className="flex-1">
								<div className="flex items-center justify-between">
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
								<p className="text-sm text-gray-400 mt-1">
									{integration.type.charAt(0).toUpperCase() +
										integration.type.slice(1)}{" "}
									Integration
								</p>
							</div>
						</div>

						<div className="space-y-4">
							<div className="p-4 rounded-lg bg-black/20 border border-white/5">
								<div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
									<PenTool className="h-4 w-4" />
									<span>Vapi Tool Details</span>
								</div>
								<p className="text-sm text-gray-400 mb-2">
									{integration.vapiTool.function.description}
								</p>
								<div className="text-xs text-gray-500">
									<p>Tool ID: {integration.vapiTool.id}</p>
									<p>
										Function:{" "}
										{integration.vapiTool?.function?.name}
									</p>
								</div>
							</div>

							<div className="p-4 rounded-lg bg-black/20 border border-white/5">
								<div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
									<Database className="h-4 w-4" />
									<span>Integration Details</span>
								</div>
								<div className="space-y-1 text-sm">
									{integration.metadata &&
										Object.entries(
											integration.metadata
										).map(([key, value]) => (
											<p
												key={key}
												className="text-gray-400"
											>
												<span className="text-gray-500">
													{key}:
												</span>{" "}
												{value}
											</p>
										))}
								</div>
							</div>

							<div className="flex items-center justify-between text-xs text-gray-500">
								<div className="flex items-center gap-1">
									<CalendarClock className="h-3 w-3" />
									<span>
										Created:{" "}
										{new Date(
											integration.createdAt
										).toLocaleDateString()}
									</span>
								</div>
								<div className="flex items-center gap-1">
									<Server className="h-3 w-3" />
									<span>
										{integration.vapiTool.server.url}
									</span>
								</div>
							</div>
						</div>
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
