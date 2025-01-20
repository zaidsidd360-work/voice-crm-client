import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
			<div className="space-y-8 text-center">
				<h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
					Voice CRM Tool
				</h1>
				<p className="text-gray-400 text-xl max-w-md mx-auto">
					Manage your customer relationships with the power of voice
					technology
				</p>
				<div className="flex items-center gap-4 justify-center mt-8">
					<Link to="/login">
						<button className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-all duration-200">
							Get Started
						</button>
					</Link>
					<Link to="/signup">
						<button className="px-8 py-3 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-200">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
