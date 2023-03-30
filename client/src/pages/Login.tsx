import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// TODO JWT DECODE

const Login: React.FC = () => {
	const { login, isAuthenticated, error } = useContext(AuthContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	// console.log({ username, password });
	useEffect(() => {
		if (error) alert(error);
	}, [error]);

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (username === "" || password === "") {
			// TODO Handle Error
			alert("username or password cannot be empty");
			return;
		}

		login(username, password);

		if (isAuthenticated) {
			navigate("/");
		}

		setUsername("");
		setPassword("");
	};

	return (
		<div className="flex items-center justify-center h-screen flex-col ">
			<h1 className="font-extrabold text-xl mb-10">Welcome Back :&#41;</h1>
			<form onSubmit={handleLoginSubmit} className="flex flex-col items-center">
				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-6">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Username
					</label>
					<input
						value={username}
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
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
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							setPassword(e.currentTarget.value)
						}
						autoComplete="on"
						type="password"
						name="password"
						className="rounded  px-3 py-2 w-full bg-transparent border-gray-500 border-2"
					/>
				</div>

				<input
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
