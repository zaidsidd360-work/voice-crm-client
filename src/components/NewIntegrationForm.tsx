/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getAirtableBases, getAirtableTables } from "../api/airtableApi";
import { getVapiTools } from "../api/vapiApi";
import { VapiTool } from "./Profile";

interface NewIntegrationFormProps {
	onClose: () => void;
	onSubmit: (data: {
		name: string;
		type: string;
		baseId?: string;
		tableId?: string;
		vapiToolId: string;
	}) => Promise<void>;
}

interface AirtableBase {
	id: string;
	name: string;
	permissionLevel: string;
}

interface AirtableTable {
	id: string;
	name: string;
	description?: string;
	fields: Array<{
		id: string;
		name: string;
		type: string;
		description?: string;
		options?: {
			isReversed?: boolean;
			inverseLinkFieldId?: string;
			linkedTableId?: string;
			prefersSingleRecordLink?: boolean;
		};
	}>;
	primaryFieldId: string;
	views: Array<{
		id: string;
		name: string;
		type: string;
	}>;
}

const NewIntegrationForm: React.FC<NewIntegrationFormProps> = ({
	onClose,
	onSubmit,
}) => {
	const [type, setType] = useState<"airtable" | "gohighlevel" | "">("");
	const [name, setName] = useState("");
	const [vapiToolId, setVapiToolId] = useState("");
	const [baseId, setBaseId] = useState("");
	const [tableId, setTableId] = useState("");
	const [vapiTools, setVapiTools] = useState<VapiTool[]>([]);
	const [bases, setBases] = useState<AirtableBase[]>([]);
	const [tables, setTables] = useState<AirtableTable[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [isLoadingVapiTools, setIsLoadingVapiTools] = useState(false);
	const [isLoadingBases, setIsLoadingBases] = useState(false);
	const [isLoadingTables, setIsLoadingTables] = useState(false);

	useEffect(() => {
		fetchVapiTools();
	}, []);

	useEffect(() => {
		if (type === "airtable") {
			fetchBases();
		}
	}, [type]);

	useEffect(() => {
		if (baseId) {
			fetchTables();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [baseId]);

	const fetchVapiTools = async () => {
		setIsLoadingVapiTools(true);
		try {
			const data = await getVapiTools(
				"27736a48-a784-4a11-a9e8-13402825c744"
			);
			setVapiTools(data);
		} catch (err: any) {
			setError(err.message || "Failed to fetch Vapi tools");
		} finally {
			setIsLoadingVapiTools(false);
		}
	};

	const fetchBases = async () => {
		setIsLoadingBases(true);
		try {
			const { bases } = await getAirtableBases(
				"patu3bTCvjKcj1dAH.14bdd086d57abbd25e028e8225211f1aca60f9ce95e0ce0526a47d19a4522379"
			);
			setBases(bases);
		} catch (err: any) {
			setError(err.message || "Failed to fetch Airtable bases");
		} finally {
			setIsLoadingBases(false);
		}
	};

	const fetchTables = async () => {
		if (!baseId) return;
		setIsLoadingTables(true);
		try {
			const { tables } = await getAirtableTables(baseId);
			if (!tables || !Array.isArray(tables)) {
				throw new Error("Invalid response format from Airtable");
			}
			console.log(tables);
			setTables(tables);
		} catch (err: any) {
			setError(err.message || "Failed to fetch tables");
			setTables([]);
		} finally {
			setIsLoadingTables(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await onSubmit({
				name,
				type,
				vapiToolId,
				...(type === "airtable" && { baseId, tableId }),
			});
		} catch (err: any) {
			setError(err.message || "Failed to create integration");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
				<div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
					{error}
				</div>
			)}

			<div>
				<label className="block text-sm font-medium text-gray-400 mb-2">
					Select Vapi Tool
				</label>
				{isLoadingVapiTools ? (
					<div className="flex items-center justify-center py-4">
						<Loader2 className="h-6 w-6 animate-spin text-white/50" />
					</div>
				) : (
					<select
						value={vapiToolId}
						onChange={(e) => setVapiToolId(e.target.value)}
						className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white"
						required
					>
						<option value="">Select Vapi Tool</option>
						{vapiTools.map((tool) => (
							<option key={tool.id} value={tool.id}>
								{tool.function.name}{" "}
							</option>
						))}
					</select>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-400 mb-2">
					Integration Type
				</label>
				<select
					value={type}
					onChange={(e) =>
						setType(e.target.value as "airtable" | "gohighlevel")
					}
					className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white"
					required
				>
					<option value="">Select Type</option>
					<option value="airtable">Airtable</option>
					<option value="gohighlevel">GoHighLevel</option>
				</select>
			</div>

			{type === "airtable" && (
				<>
					{isLoadingBases ? (
						<div className="flex items-center justify-center py-4">
							<Loader2 className="h-6 w-6 animate-spin text-white/50" />
						</div>
					) : (
						<div>
							<label className="block text-sm font-medium text-gray-400 mb-2">
								Select Base
							</label>
							<select
								value={baseId}
								onChange={(e) => setBaseId(e.target.value)}
								className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white"
								required
							>
								<option value="">Select Base</option>
								{bases.map((base) => (
									<option key={base.id} value={base.id}>
										{base.name}
									</option>
								))}
							</select>
						</div>
					)}

					{baseId && (
						<>
							{isLoadingTables ? (
								<div className="flex items-center justify-center py-4">
									<Loader2 className="h-6 w-6 animate-spin text-white/50" />
								</div>
							) : (
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										Select Table
									</label>
									<select
										value={tableId}
										onChange={(e) =>
											setTableId(e.target.value)
										}
										className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white"
										required
									>
										<option value="">Select Table</option>
										{tables.map((table) => (
											<option
												key={table.id}
												value={table.id}
											>
												{table.name}
											</option>
										))}
									</select>
								</div>
							)}
						</>
					)}
				</>
			)}

			{((type === "airtable" && baseId && tableId) ||
				type === "gohighlevel") && (
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
			)}

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
					disabled={
						isLoading ||
						!vapiToolId ||
						(type === "airtable" && (!baseId || !tableId))
					}
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
