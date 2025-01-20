/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Database, Loader2, Mail, PenTool, User } from "lucide-react";
import { getVapiTools } from "../api/vapiApi";
import VapiToolCard from "./VapiToolCard";
import { useAuth } from "../contexts/AuthContext";
import { getAirtableBases } from "../api/airtableApi";

export interface VapiTool {
	id: string;
	createdAt: string;
	updatedAt: string;
	type: string;
	function: {
		name: string;
		async: boolean;
		description: string;
		parameters: {
			type: string;
			properties: Record<
				string,
				{
					description: string;
					type: string;
				}
			>;
			required: string[];
		};
	};
	messages: Array<{
		type: string;
		content: string;
		role?: string;
	}>;
	orgId: string;
	server: {
		url: string;
		timeoutSeconds: number;
	};
	async: boolean;
}

export interface AirtableBase {
	id: string;
	name: string;
	permissionLevel: string;
}

const Profile: React.FC = () => {
	const [tools, setTools] = useState<VapiTool[]>([]);
	const [bases, setBases] = useState<AirtableBase[]>([]);
	const [isLoadingTools, setIsLoadingTools] = useState(true);
	const [isLoadingBases, setIsLoadingBases] = useState(true);
	const [toolsError, setToolsError] = useState<string | null>(null);
	const [basesError, setBasesError] = useState<string | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		const fetchTools = async () => {
			try {
				const data = await getVapiTools(
					"27736a48-a784-4a11-a9e8-13402825c744"
				);
				setTools(data);
			} catch (err: any) {
				setToolsError(err.message || "Failed to fetch Vapi tools");
			} finally {
				setIsLoadingTools(false);
			}
		};

		const fetchBases = async () => {
			try {
				const { bases } = await getAirtableBases(
					"patu3bTCvjKcj1dAH.14bdd086d57abbd25e028e8225211f1aca60f9ce95e0ce0526a47d19a4522379"
				);
				setBases(bases);
			} catch (err: any) {
				setBasesError(err.message || "Failed to fetch Airtable bases");
			} finally {
				setIsLoadingBases(false);
			}
		};

		fetchTools();
		fetchBases();
	}, []);

	return (
		<div className="space-y-8 overflow-y-scroll h-full pr-5">
			{/* Profile Section */}
			<div className="w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8">
				<h2 className="text-3xl font-bold text-white mb-8">Profile</h2>
				<div className="space-y-6">
					<div className="flex items-center gap-4">
						<div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
							<User className="h-10 w-10 text-white/60" />
						</div>
						<div>
							<h3 className="text-xl font-semibold text-white">
								{user?.name}
							</h3>
							<div className="flex items-center gap-2 text-gray-400">
								<Mail className="h-4 w-4" />
								<span>{user?.email}</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-400">
								User ID
							</label>
							<input
								type="text"
								value={user?.id}
								readOnly
								className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Vapi Tools Section */}
			<div className="w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8">
				<div className="flex items-center gap-3 mb-8">
					<PenTool className="h-6 w-6 text-white" />
					<h2 className="text-3xl font-bold text-white">
						Vapi Tools
					</h2>
				</div>

				{isLoadingTools && (
					<div className="flex items-center justify-center py-12">
						<Loader2 className="h-8 w-8 animate-spin text-white/50" />
					</div>
				)}

				{toolsError && (
					<div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
						{toolsError}
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{tools.map((tool) => (
						<VapiToolCard key={tool.id} tool={tool} />
					))}
				</div>
			</div>

			{/* Airtable Bases Section */}
			<div className="w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8">
				<div className="flex items-center gap-3 mb-8">
					<Database className="h-6 w-6 text-white" />
					<h2 className="text-3xl font-bold text-white">
						Airtable Bases
					</h2>
				</div>

				{isLoadingBases && (
					<div className="flex items-center justify-center py-12">
						<Loader2 className="h-8 w-8 animate-spin text-white/50" />
					</div>
				)}

				{basesError && (
					<div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
						{basesError}
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{bases.map((base) => (
						<div
							key={base.id}
							className="p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 bg-white/5"
						>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-medium text-white">
									{base.name}
								</h3>
								<span
									className={`px-2 py-1 rounded-full text-xs ${
										base.permissionLevel === "create"
											? "bg-green-500/10 text-green-400"
											: "bg-blue-500/10 text-blue-400"
									}`}
								>
									{base.permissionLevel}
								</span>
							</div>
							<p className="text-sm font-mono text-gray-400">
								{base.id}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Profile;

// patu3bTCvjKcj1dAH.7c39ca650e92b0272aca4ab7cac510aa463639e76c928889e61741f959578a74 airtable voice token
