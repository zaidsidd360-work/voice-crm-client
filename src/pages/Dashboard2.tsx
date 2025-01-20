import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout: React.FC = () => {
	return (
		<div className="min-h-screen flex bg-black bg-gradient-to-br from-black via-gray-900 to-black">
			<Sidebar />
			<main className="flex-1 p-8">
				<Outlet />
			</main>
		</div>
	);
};

export default DashboardLayout;
