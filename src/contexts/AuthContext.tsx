/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { setToken, clearToken } from "../services/authService";

interface AuthContextType {
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
	login: (userData: any) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const userInfo = localStorage.getItem("user");
		if (userInfo) setUser(JSON.parse(userInfo));
	}, []);

	const login = (userData: any) => {
		setUser(userData.user);
		setToken(userData.accessToken, userData.refreshToken, userData.user);
	};

	const logout = () => {
		clearToken();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
