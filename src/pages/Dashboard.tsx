import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
	const { user, logout } = useAuth();
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const navigate = useNavigate();

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await logout();
			navigate("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-black">
			<div className="w-full max-w-4xl p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl">
				<div className="mb-8 text-center relative">
					<button
						onClick={handleLogout}
						disabled={isLoggingOut}
						className="absolute right-0 top-0 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all duration-200 flex items-center gap-2"
					>
						{isLoggingOut ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<>
								<LogOut className="h-4 w-4" />
								<span>Logout</span>
							</>
						)}
					</button>
					<h2 className="text-3xl font-bold text-white mb-2">
						Welcome, {user?.name}
					</h2>
					<p className="text-gray-400">Your Dashboard</p>
				</div>
				<div className="space-y-6">
					<div className="bg-black/50 border border-white/10 rounded-lg p-6">
						<h3 className="text-xl font-semibold text-white mb-2">
							User Information
						</h3>
						<p className="text-gray-400">
							<strong>Name:</strong> {user?.name}
						</p>
						<p className="text-gray-400">
							<strong>Email:</strong> {user?.email}
						</p>
					</div>
					<div className="bg-black/50 border border-white/10 rounded-lg p-6">
						<h3 className="text-xl font-semibold text-white mb-2">
							Other Information
						</h3>
						<p className="text-gray-400">
							More details coming soon...
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
