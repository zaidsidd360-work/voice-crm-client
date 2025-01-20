import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { createApiKey } from "../api/keysApi";
import { useAuth } from "../contexts/AuthContext";
import { ApiKey } from "./ApiKeys";

interface NewApiKeyFormProps {
	onClose: () => void;
	setApiKeys: React.Dispatch<React.SetStateAction<ApiKey[]>>;
}

const NewApiKeyForm: React.FC<NewApiKeyFormProps> = ({
	onClose,
	setApiKeys,
}) => {
	const [name, setName] = useState("");
	const [key, setKey] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const { user } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const {
				data: { apiKey },
			} = await createApiKey({
				name,
				key,
				userId: user.id,
			});
			console.log(apiKey);
			setApiKeys((prev) => [...prev, apiKey]);
			onClose();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setError(error.response?.data?.error || "Failed to create API key");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-400 mb-2">
					API Key Name
				</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="e.g., Airtable API Key"
					className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-400 mb-2">
					API Key Value
				</label>
				<input
					type="text"
					value={key}
					onChange={(e) => setKey(e.target.value)}
					placeholder="Enter your third-party API key"
					className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white font-mono"
					required
				/>
			</div>
			<div className="flex justify-end gap-3 pt-4">
				<button
					type="button"
					onClick={onClose}
					className="px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isLoading}
					className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
				>
					{isLoading ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						"Save API Key"
					)}
				</button>
			</div>
		</form>
	);
};

export default NewApiKeyForm;
