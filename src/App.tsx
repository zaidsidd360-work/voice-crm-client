import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import DashboardLayout from "./pages/Dashboard2";
import Overview from "./components/Overview";
import Profile from "./components/Profile";
import Integrations from "./components/Integrations";
import ApiKeys from "./components/ApiKeys";
import ExcelCallSheets from "./components/ExcelCallSheets";

const App: React.FC = () => {
	return (
		<div className="w-[100vw]">
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/dashboard" element={<DashboardLayout />}>
							<Route index element={<Overview />} />
							<Route path="profile" element={<Profile />} />
							<Route
								path="integrations"
								element={<Integrations />}
							/>
							<Route path="api-keys" element={<ApiKeys />} />
							<Route
								path="excel-call-sheets"
								element={<ExcelCallSheets />}
							/>
						</Route>
					</Routes>
				</Router>
			</AuthProvider>
		</div>
	);
};

export default App;
