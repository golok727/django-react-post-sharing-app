import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// TODO JWT DECODE

const Login: React.FC = () => {
	const [fieldError, setFieldError] = useState(false);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { loginUser, authError, user, loading } = useContext(AuthContext);

	const getEmpties = () => {
		let str = "";

		if (!username) str += "username";
		if (!username && !password) str += " and ";
		if (!password) str += "password";

		return str;
	};

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (username === "" || password === "") {
			// TODO Handle Error
			setFieldError(true);

			setTimeout(() => setFieldError(() => false), 5000);
			return;
		}

		loginUser(username, password, () => navigate("/"));

		setUsername("");
		setPassword("");
	};

	return user ? (
		<Navigate to="/" />
	) : (
		<div className="flex items-center justify-center h-screen flex-col ">
			<h1 className="font-extrabold text-xl mb-10">Welcome Back :&#41;</h1>

			{fieldError && (
				<span className="text-red-500 transition-all duration-100">
					Field{" "}
					<span className="font-bold text-green-500">{getEmpties()} </span>{" "}
					cannot be empty
				</span>
			)}

			{authError && (
				<span className="text-red-500 transition-all duration-100">
					{authError}
				</span>
			)}
			<form onSubmit={handleLoginSubmit} className="flex flex-col items-center">
				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-6">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Username
					</label>
					<input
						value={username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUsername(e.currentTarget.value)
						}
						placeholder="@username"
						type="text"
						name="username"
						className="rounded  px-3 py-2 w-full bg-transparent border-gray-500 border-2"
					/>
				</div>

				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-6">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Password
					</label>
					<input
						value={password}
						placeholder="Password"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.currentTarget.value)
						}
						autoComplete="new-password"
						type="password"
						name="password"
						className="rounded  px-3 py-2 w-full bg-transparent border-gray-500 border-2"
					/>
				</div>

				<input
					disabled={loading}
					type="submit"
					value="Login"
					className=" bg-green-600 rounded-full w-1/2 px-6 py-2 cursor-pointer"
				/>
			</form>

			<div className="mt-2">
				<Link to={"/signup"} className="cursor-pointer">
					<span className="text-gray-500 hover:text-gray-200 transition-color duration-100">
						Don&apos;t have an account? Click here to make one...
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Login;
