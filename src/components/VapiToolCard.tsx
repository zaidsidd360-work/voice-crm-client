import React from "react";
import { VapiTool } from "./Profile";

interface VapiToolCardProps {
	tool: VapiTool;
}

const VapiToolCard: React.FC<VapiToolCardProps> = ({ tool }) => {
	return (
		<div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-200">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-medium text-white">
					{tool.function.name}
				</h3>
				<span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400">
					{tool.type}
				</span>
			</div>

			<p className="text-gray-400 mb-4">{tool.function.description}</p>

			<div className="space-y-4">
				<div>
					<h4 className="text-sm font-medium text-gray-300 mb-2">
						Parameters
					</h4>
					<div className="space-y-2">
						{Object.entries(
							tool.function.parameters.properties
						).map(([key, value]) => (
							<div
								key={key}
								className="flex items-start gap-2 text-sm"
							>
								<span className="text-blue-400">{key}</span>
								<span className="text-gray-400">
									({value.type})
								</span>
								{tool.function.parameters.required.includes(
									key
								) && (
									<span className="text-red-400 text-xs">
										required
									</span>
								)}
							</div>
						))}
					</div>
				</div>

				<div>
					<h4 className="text-sm font-medium text-gray-300 mb-2">
						Messages
					</h4>
					<div className="space-y-2">
						{tool.messages.map((message, index) => (
							<div key={index} className="text-sm">
								<span className="text-gray-500">
									{message.type}:
								</span>
								<span className="text-gray-400 ml-2">
									{message.content}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="text-sm text-gray-400">
					<p>
						Created: {new Date(tool.createdAt).toLocaleDateString()}
					</p>
					<p>
						Updated: {new Date(tool.updatedAt).toLocaleDateString()}
					</p>
					<p>Server URL: {tool.server.url}</p>
					<p>Timeout: {tool.server.timeoutSeconds}s</p>
				</div>
			</div>
		</div>
	);
};

export default VapiToolCard;
