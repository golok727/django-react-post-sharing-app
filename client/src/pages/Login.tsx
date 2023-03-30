import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
	return (
		<div className="flex items-center justify-center h-screen flex-col ">
			<h1 className="font-extrabold text-xl mb-10">Welcome Back :&#41;</h1>
			<form className="flex flex-col items-center">
				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-6">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Username
					</label>
					<input
						placeholder="@username"
						type="text"
						className="rounded  px-3 py-2 w-full bg-transparent border-gray-500 border-2"
					/>
				</div>

				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-6">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Password
					</label>
					<input
						placeholder="Password"
						type="password"
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
