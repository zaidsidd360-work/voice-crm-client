import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
	User,
	Settings,
	Key,
	LogOut,
	Loader2,
	LayoutDashboard,
	NotebookText,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar: React.FC = () => {
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

	const navigation = [
		{ name: "Overview", href: "/dashboard", icon: LayoutDashboard },
		{ name: "Profile", href: "/dashboard/profile", icon: User },
		{
			name: "Integrations",
			href: "/dashboard/integrations",
			icon: Settings,
		},
		{ name: "API Keys", href: "/dashboard/api-keys", icon: Key },
		{
			name: "Excel call sheets",
			href: "/dashboard/excel-call-sheets",
			icon: NotebookText,
		},
	];

	return (
		<div className="w-64 border-r border-white/10 p-4 flex flex-col">
			<div className="px-3 py-2 mb-8">
				<h2 className="text-xl font-bold text-white">Voice CRM</h2>
			</div>

			<nav className="flex-1 space-y-1">
				{navigation.map((item) => (
					<NavLink
						key={item.name}
						to={item.href}
						className={({ isActive }) =>
							`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
								isActive
									? "bg-white/10 text-white"
									: "text-gray-400 hover:bg-white/5 hover:text-white"
							}`
						}
					>
						<item.icon className="h-5 w-5 mr-3" />
						{item.name}
					</NavLink>
				))}
			</nav>

			<div className="mt-auto pt-4 border-t border-white/10">
				<div className="px-3 py-2 mb-2">
					<p className="text-sm text-gray-400">Signed in as</p>
					<p className="text-sm font-medium text-white">
						{user?.email}
					</p>
				</div>
				<button
					onClick={handleLogout}
					disabled={isLoggingOut}
					className="w-full px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all duration-200 flex items-center"
				>
					{isLoggingOut ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<>
							<LogOut className="h-4 w-4 mr-2" />
							<span>Logout</span>
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
