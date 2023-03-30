import React from "react";
export interface User {
	id: number;
}

export type Token = {
	access: string;
	refresh: string;
};
export interface AuthContextType {
	isLoading: boolean;
	isAuthenticated: boolean;
	token: Token;
	user: User;
	error: string;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	setToken: React.Dispatch<React.SetStateAction<Token>>;

	login: (username: string, password: string) => void;
}

export interface LoginResponse {
	status: number;
	token?: Token;
	details?: string;
}
