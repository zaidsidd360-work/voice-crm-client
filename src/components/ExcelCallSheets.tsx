/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import axiosInstance from "../services/axiosConfig";

const ExcelCallSheets: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const fileInputRef = useRef<HTMLInputElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [freq, setFreq] = useState<number>(3);

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setIsLoading(true);
		setError(null);

		console.log(file);
		console.log(fileInputRef.current);

		try {
			// Validate file type
			if (!file.name.match(/\.(xlsx|xls)$/)) {
				throw new Error("Please upload an Excel file (.xlsx or .xls)");
			}

			const reader = new FileReader();
			reader.onload = async (e) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				let jsonData: any[] = [];
				try {
					console.log("hello", e.target?.result);
					const data = e.target?.result;
					const workbook = XLSX.read(data, { type: "binary" });
					const sheetName = workbook.SheetNames[0];
					const sheet = workbook.Sheets[sheetName];
					jsonData = XLSX.utils.sheet_to_json(sheet);
					console.log(jsonData);
					const { data: res } = await axiosInstance.post(
						"/call-sheet",
						{
							contacts: jsonData,
							frequency: freq,
						}
					);
					console.log(res);
				} catch (err: any) {
					setError(err.message || "Failed to parse Excel file");
				} finally {
					setIsLoading(false);
				}
			};

			reader.onerror = () => {
				setError("Failed to read file");
				setIsLoading(false);
			};

			reader.readAsArrayBuffer(file);

			// reader.readAsBinaryString(file);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message || "Failed to process file");
			setIsLoading(false);
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="w-full h-full overflow-y-auto rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8">
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-3xl font-bold text-white">
					Excel Call Sheets
				</h2>
				<div>
					<input
						type="file"
						onChange={handleFileUpload}
						ref={fileInputRef}
						accept=".xlsx,.xls"
						className="hidden"
					/>
					<button
						onClick={handleUploadClick}
						disabled={isLoading}
						className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
					>
						{isLoading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Upload className="h-4 w-4" />
						)}
						<span>Upload Excel</span>
					</button>
				</div>
			</div>
			<p className="text-white/50 text-sm">
				View{" "}
				<a
					href="https://docs.google.com/spreadsheets/d/1Ac-90pkYW8mCH7mjNayO6bwf-URHx2IUjE4_nEMoHPA/edit?usp=sharing"
					className="underline hover:text-white"
					target="_blank"
				>
					sample Excel sheet
				</a>{" "}
				to see the required format.
			</p>
			<div className="mt-4 w-[18rem] border rounded-lg border-white/10 p-2">
				<label htmlFor="frequency" className="text-white text-sm">
					Calling Frequency (seconds)
				</label>
				<div className="flex justify-evenly gap-2 text-white text-sm mt-3">
					1
					<input
						type="range"
						id="frequency"
						min="1"
						max="10"
						className="w-full h-2 mt-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
						value={freq}
						onChange={(e) => setFreq(Number(e.target.value))}
					/>
					10
				</div>
			</div>
			{error && (
				<div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
					{error}
				</div>
			)}

			{isLoading && (
				<div className="flex items-center justify-center py-12">
					<Loader2 className="h-8 w-8 animate-spin text-white/50" />
				</div>
			)}
		</div>
	);
};

export default ExcelCallSheets;
