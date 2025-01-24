import React, { useEffect, useState } from "react";
import { Plus, Loader2, PenTool, Power } from "lucide-react";
import NewIntegrationForm from "./NewIntegrationForm";
import Modal from "./Modal";
import { Database, CalendarClock } from "lucide-react";
import { getIntegrations } from "../api/integrationApi";
import GHL from "../assets/ghlLogo.jpg";
import Airtable from "../assets/airtableLogo.png";
import { createIntegration } from "../api/integrationApi";
import { useAuth } from "../contexts/AuthContext";

export interface Integration {
	_id: string;
	userId: string;
	name: string;
	type: "airtable" | "gohighlevel";
	vapiApiKey: string;
	vapiToolId: string;
	airtableToken?: string;
	baseId?: string;
	tableId?: string;
	ghlApiKey?: string;
	status: "active" | "inactive";
	createdAt: string;
	updatedAt: string;
}

const logos = {
	gohighlevel: GHL,
	airtable: Airtable,
};

const Integrations: React.FC = () => {
	const [integrations, setIntegrations] = useState<Integration[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState("");

	const { user } = useAuth();
	console.log(error);

	useEffect(() => {
		fetchIntegrations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchIntegrations = async () => {
		setIsLoading(true);
		setError("");

		try {
			const response = await getIntegrations(user.id);
			console.log(response);
			setIntegrations(response.data);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(
				err.response?.data?.message || "Failed to fetch integrations"
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCreateIntegration = async (data: {
		name: string;
		type: string;
		baseId?: string;
		tableId?: string;
		vapiToolId: string;
		ghlApiKey?: string;
	}) => {
		setIsLoading(true);
		setError("");

		try {
			await createIntegration({
				userId: user.id,
				name: data.name,
				type: data.type as "airtable" | "gohighlevel",
				vapiToolId: data.vapiToolId,
				...(data.type === "airtable" && {
					baseId: data.baseId,
					tableId: data.tableId,
				}),
				...(data.type === "gohighlevel" && {
					ghlApiKey: data.ghlApiKey,
				}),
			});

			// Refresh integrations after creating new one
			fetchIntegrations();
			setIsModalOpen(false);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(
				err.response?.data?.message || "Failed to create integration"
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="w-full h-[60vh] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-white/50" />
			</div>
		);
	}

	// if (integrations.length === 0) {
	// 	return (
	// 		<div className="w-full h-[60vh] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 flex flex-col items-center justify-center">
	// 			<p className="text-gray-400 mb-4">No integrations found</p>
	// 			<button
	// 				onClick={() => setIsModalOpen(true)}
	// 				className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
	// 			>
	// 				<Plus className="h-4 w-4" />
	// 				<span>Create Integration</span>
	// 			</button>
	// 		</div>
	// 	);
	// }

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
						key={integration._id}
						className="p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 bg-white/5"
					>
						<div className="flex items-start gap-4 mb-4">
							<img
								src={logos[integration.type]}
								alt={integration.type}
								className="w-12 h-12 rounded-lg object-cover"
							/>
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-medium text-white">
										{integration.name}
									</h3>
									{/* <span
										className={`px-2 py-1 rounded-full text-xs ${
											integration.status === "active"
												? "bg-green-500/10 text-green-400"
												: "bg-yellow-500/10 text-yellow-400"
										}`}
									>
										{integration.status}
									</span> */}
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<div className="p-4 rounded-lg bg-black/20 border border-white/5">
								<div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
									<PenTool className="h-4 w-4" />
									<span>Vapi Details</span>
								</div>
								<div className="space-y-1 text-sm">
									<p className="text-gray-400">
										<span className="text-gray-500">
											Tool ID:
										</span>{" "}
										{integration.vapiToolId}
									</p>
									{/* <p className="text-gray-400">
										<span className="text-gray-500">
											API Key:
										</span>{" "}
										{integration.vapiApiKey}
									</p> */}
								</div>
							</div>

							{integration.type === "airtable" && (
								<div className="p-4 rounded-lg bg-black/20 border border-white/5">
									<div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
										<Database className="h-4 w-4" />
										<span>Airtable Details</span>
									</div>
									<div className="space-y-1 text-sm">
										<p className="text-gray-400">
											<span className="text-gray-500">
												Base ID:
											</span>{" "}
											{integration.baseId}
										</p>
										<p className="text-gray-400">
											<span className="text-gray-500">
												Table ID:
											</span>{" "}
											{integration.tableId}
										</p>
									</div>
								</div>
							)}

							<div className="flex items-center justify-between text-xs text-gray-500">
								<div className="flex items-center gap-1">
									<CalendarClock className="h-3 w-3" />
									<span>
										Updated:{" "}
										{new Date(
											integration.updatedAt
										).toLocaleDateString()}
									</span>
								</div>
								<button
									className={`flex items-center gap-1 px-2 py-1 rounded ${
										integration.status === "active"
											? "text-green-400 hover:bg-green-400/10"
											: "text-yellow-400 hover:bg-yellow-400/10"
									}`}
								>
									<Power className="h-3 w-3" />
									<span>
										{integration.status === "active"
											? "Active"
											: "Inactive"}
									</span>
								</button>
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
