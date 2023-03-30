import React, { createContext, useEffect, useState } from "react";
import { AuthContextType, Token, User } from "./AuthContextTypes";

const initialAuthState = {
	isLoading: false,
	isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType>(null!);

type Props = {
	children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(initialAuthState.isLoading);
	const [isAuthenticated, setIsAuthenticated] = useState(
		initialAuthState.isAuthenticated
	);
	const [token, setToken] = useState<Token>(null!);
	const [user, setUser] = useState<User>(null!);
	const [error, setError] = useState("");

	const login = async (username: string, password: string) => {
		try {
			const res = await fetch("/api/token/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});
			console.log(res.status);
			const data = await res.json();
			console.log(data);
			if (res.status === 401) {
				setError(data?.detail);
				setTimeout(() => setError(""), 3000);
			}

			if (res.status === 200) {
				setToken(data);
				localStorage.setItem("token", JSON.stringify(data));
				setIsAuthenticated(true);
			}
		} catch (error) {
			setError("Something Went Wrong. Please Try Again");
			setTimeout(() => setTimeout(""), 3000);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setToken(() => JSON.parse(localStorage.getItem("token") as string));
			setIsAuthenticated(true);
			console.log(token, isAuthenticated);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoading,
				isAuthenticated,
				setIsAuthenticated,
				setToken,
				token,
				user,
				login,
				error,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
