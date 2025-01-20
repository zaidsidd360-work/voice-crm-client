import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface NewIntegrationFormProps {
	onSubmit: (data: { name: string; type: string }) => Promise<void>;
	onClose: () => void;
}

const NewIntegrationForm: React.FC<NewIntegrationFormProps> = ({
	onSubmit,
	onClose,
}) => {
	const [name, setName] = useState("");
	const [type, setType] = useState("whatsapp");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await onSubmit({ name, type });
			onClose();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-400 mb-2">
					Integration Name
				</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-400 mb-2">
					Type
				</label>
				<select
					value={type}
					onChange={(e) => setType(e.target.value)}
					className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white"
				>
					<option value="airtable">Airtable</option>
					<option value="gohighlevel">GoHighLevel</option>
					<option value="zoho">Zoho CRM</option>
				</select>
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
						"Create Integration"
					)}
				</button>
			</div>
		</form>
	);
};

export default NewIntegrationForm;
