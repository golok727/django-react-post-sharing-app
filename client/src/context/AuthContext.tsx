import React, { createContext, useEffect, useState } from "react";

export interface AuthContextType {
	isLoggedIn: boolean;
	isLoading: boolean;
	login: (username: string, password: string) => void;
}

const initialAuthState = {
	isLoggedIn: false,
	isLoading: false,
};

export const AuthContext = createContext<AuthContextType>(null!);

type Props = {
	children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
	async function login(username: string, password: string) {
		console.log("hello");
	}

	return (
		<AuthContext.Provider value={{ ...initialAuthState, login }}>
			{children}
		</AuthContext.Provider>
	);
};
