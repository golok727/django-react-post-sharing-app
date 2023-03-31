import React, { createContext, useState } from "react";
import {
	GetScrollRestorationKeyFunction,
	createBrowserRouter,
	useNavigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
export interface Tokens {
	access: string;
	refresh: string;
}
export interface User {
	user_id: number;
	username: string;
}

interface AuthState {
	user: User | null;
	tokens: Tokens | null;
	authError: string;
	loading: boolean;
	loginUser: (username: string, password: string, cb: () => void) => void;
	logoutUser: () => void;
	signUpUser: (
		username: string,
		password: string,
		email: string,
		cb: () => void
	) => void;
}

export const AuthContext = createContext<AuthState>(null!);

type Props = {
	children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const navigate = useNavigate();

	const [authError, setAuthError] = useState("");
	const [tokens, setAuthTokens] = useState<Tokens | null>(() =>
		localStorage.getItem("tokens")
			? JSON.parse(localStorage.getItem("tokens") as string)
			: null
	);
	const [user, setUser] = useState<User | null>(() =>
		localStorage.getItem("tokens")
			? jwtDecode(
					(JSON.parse(localStorage.getItem("tokens") as string) as Tokens)
						.access
			  )
			: null
	);
	const [loading, setLoading] = useState(false);

	// Login
	const loginUser = async (
		username: string,
		password: string,
		cb: () => void
	) => {
		try {
			setLoading(() => true);
			const res = await fetch("/api/token/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();

			if (res.status === 200) {
				setAuthTokens(() => data);
				setUser(jwtDecode(data.access));
				localStorage.setItem("tokens", JSON.stringify(data));
				cb();
				setLoading(() => false);
				return;
			}

			if (res.status === 401) {
				if (data && data.detail) {
					setAuthError(() => data.detail);
				} else {
					setAuthError(
						() =>
							"Something Went Wrong.. Please Try again with correct credentials"
					);

					setLoading(() => false);
				}

				setTimeout(() => {
					setAuthError("");
				}, 5000);

				setLoading(() => false);

				// TODO logout
			}
		} catch (error) {
			setAuthError("Server Error.... Please Try again later");
			setTimeout(() => {
				setAuthError("");
				setLoading(false);
			}, 3000);
		}
	};

	// logout
	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("tokens");
		navigate("/login");
	};

	// radha@krsna123
	const signUpUser = async (
		username: string,
		email: string,
		password: string,
		cb: () => void
	) => {
		setLoading(true);
		try {
			const res = await fetch("/api/signup/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			const data = await res.json();

			if (res.status === 409) {
				setLoading(false);
				setAuthError(() => data.data);

				setTimeout(() => setAuthError(""), 4000);
				return;
			}
			if (res.status === 200 || res.status === 201) {
				setLoading(false);
				cb();
			}
		} catch (error) {
			setLoading(() => false);
			setAuthError("Something went wrong...");
			setTimeout(() => setAuthError(""), 4000);
			return;
		}
	};

	const contextValue: AuthState = {
		user,
		tokens,
		authError,
		loading,
		loginUser,
		logoutUser,
		signUpUser,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
