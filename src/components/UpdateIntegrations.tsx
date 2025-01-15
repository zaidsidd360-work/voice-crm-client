import React, { useState } from "react";
import { updateIntegration } from "../api/integrationApi";

const UpdateIntegration: React.FC = () => {
	const [userId, setUserId] = useState("");
	const [formData, setFormData] = useState({
		retellApiKey: "",
		vapiApiKey: "",
		airtableApiKey: "",
		ghlApiKey: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const response = (await updateIntegration(userId, formData)) as any;
			console.log("Integration updated:", response.data);
		} catch (error) {
			console.error("Error updating integration:", error);
		}
	};

	return (
		<div className="p-6 bg-white shadow rounded-lg">
			<h2 className="text-lg font-semibold mb-4">Update Integration</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					placeholder="User ID"
					onChange={(e) => setUserId(e.target.value)}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
				<input
					type="text"
					name="retellApiKey"
					placeholder="Retell API Key"
					onChange={handleChange}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
				{/* <input
					type="text"
					name="vapiApiKey"
					placeholder="Vapi API Key"
					onChange={handleChange}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/> */}
				<input
					type="text"
					name="airtableApiKey"
					placeholder="Airtable API Key"
					onChange={handleChange}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
				{/* <input
					type="text"
					name="ghlApiKey"
					placeholder="GHL API Key"
					onChange={handleChange}
					className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/> */}
				<button
					type="submit"
					className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
				>
					Update Integration
				</button>
			</form>
		</div>
	);
};

export default UpdateIntegration;
