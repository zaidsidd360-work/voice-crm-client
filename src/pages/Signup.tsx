import React, { useState } from "react";
import axios from "../services/axiosConfig";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

const Signup: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const { data } = await axios.post("/auth/register", {
				name,
				email,
				password,
			});
			login(data.data);
			navigate("/dashboard");
		} catch (err) {
			setError("Error creating account");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-gray-900 to-black">
			<div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl">
				<div className="mb-8 text-center">
					<h2 className="text-3xl font-bold text-white mb-2">
						Create account
					</h2>
					<p className="text-gray-400">
						Get started with your free account
					</p>
				</div>
				{error && (
					<div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm flex items-center gap-2">
						<span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Name
						</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white transition-all duration-200 hover:border-white/20"
								required
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Email
						</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white transition-all duration-200 hover:border-white/20"
								required
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Password
						</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:outline-none text-white transition-all duration-200 hover:border-white/20"
								required
							/>
						</div>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-3 px-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? (
							<Loader2 className="h-5 w-5 animate-spin" />
						) : (
							<>
								<span>Create Account</span>
								<ArrowRight className="h-5 w-5" />
							</>
						)}
					</button>
				</form>
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-white/10"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-black text-gray-400">
								Or continue with
							</span>
						</div>
					</div>
				</div>
				<div className="mt-6 text-center text-gray-400">
					Already have an account?{" "}
					<Link to="/login" className="text-white hover:underline">
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;
