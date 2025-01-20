import React, { useEffect, useState } from "react";
import { Plus, Loader2, Copy, Check } from "lucide-react";
import NewApiKeyForm from "./NewApiKeyForm";
import Modal from "./Modal";
import { getApiKeys } from "../api/keysApi";
import { useAuth } from "../contexts/AuthContext";

export interface ApiKey {
	id: string;
	name: string;
	key: string;
	createdAt: string;
	lastUsed?: string;
}

// const dummyApiKeys: ApiKey[] = [
// 	{
// 		id: "1",
// 		name: "Production API Key",
// 		key: "sk_live_123456789",
// 		createdAt: "2024-01-01",
// 		lastUsed: "2024-03-15",
// 	},
// 	{
// 		id: "2",
// 		name: "Development API Key",
// 		key: "sk_dev_987654321",
// 		createdAt: "2024-01-02",
// 		lastUsed: "2024-03-14",
// 	},
// ];

const ApiKeys: React.FC = () => {
	const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const { user } = useAuth();

	console.log(user);

	useEffect(() => {
		const fetchApiKeys = async () => {
			try {
				const response = await getApiKeys(user.id);
				console.log(response);
				setApiKeys(response.data.apiKeys);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				console.log(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchApiKeys();
	}, []);

	const handleCopyKey = async (id: string, key: string) => {
		await navigator.clipboard.writeText(key);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 2000);
	};

	if (isLoading) {
		return (
			<div className="w-full h-[60vh] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-white/50" />
			</div>
		);
	}

	// if (apiKeys.length === 0) {
	// 	return (
	// 		<div className="w-full h-[60vh] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 flex flex-col items-center justify-center">
	// 			<p className="text-gray-400 mb-4">No API keys found</p>
	// 			<button
	// 				onClick={() => setIsModalOpen(true)}
	// 				className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
	// 			>
	// 				<Plus className="h-4 w-4" />
	// 				<span>Create API Key</span>
	// 			</button>
	// 		</div>
	// 	);
	// }

	return (
		<div className="w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8">
			{/* {error && (
				<div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
					{error}
				</div>
			)} */}
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-3xl font-bold text-white">API Keys</h2>
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
				>
					<Plus className="h-4 w-4" />
					<span>New API Key</span>
				</button>
			</div>

			<div className="space-y-4">
				{apiKeys?.map((apiKey) => (
					<div
						key={apiKey?.id}
						className="p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 bg-white/5"
					>
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-medium text-white">
								{apiKey?.name}
							</h3>
							<button
								onClick={() =>
									handleCopyKey(apiKey?.id, apiKey?.key)
								}
								className="p-2 rounded-lg hover:bg-white/10 transition-colors"
							>
								{copiedId === apiKey?.id ? (
									<Check className="h-4 w-4 text-green-500" />
								) : (
									<Copy className="h-4 w-4 text-gray-400" />
								)}
							</button>
						</div>
						<p className="font-mono text-sm text-gray-400 mb-2">
							{apiKey?.key}
						</p>
						<div className="flex items-center gap-4 text-sm text-gray-400">
							<p>
								Created:{" "}
								{new Date(
									apiKey?.createdAt
								).toLocaleDateString()}
							</p>
							{apiKey?.lastUsed && (
								<p>
									Last used:{" "}
									{new Date(
										apiKey?.lastUsed
									).toLocaleDateString()}
								</p>
							)}
						</div>
					</div>
				))}
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Create New API Key"
			>
				<NewApiKeyForm
					onClose={() => setIsModalOpen(false)}
					setApiKeys={setApiKeys}
				/>
			</Modal>
		</div>
	);
};

export default ApiKeys;
