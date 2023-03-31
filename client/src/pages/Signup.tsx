import React, { useContext, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

enum VALIDATION_ERRORS {
	VALID = "",
	PASS_MATCH = "Passwords does not match",
	PASS_VALIDATE = "Password Must Contain Minimum 8 characters, at least one letter, one number and one special character:",
	EMPTY_FIELDS = "All fields are required...",
}

const SignUp: React.FC = () => {
	const { authError, signUpUser } = useContext(AuthContext);

	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [formValidationError, setFormValidationError] =
		useState<VALIDATION_ERRORS>(VALIDATION_ERRORS.VALID);

	const navigate = useNavigate();
	const validatePassword = useCallback(
		(password: string) => {
			console.log("CALL");
			if (
				password.match(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
				)
			)
				return true;
			return false;
		},
		[password]
	);

	const handleSignUp = (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !email || !password || !confirmPassword) {
			setFormValidationError(VALIDATION_ERRORS.EMPTY_FIELDS);
			setTimeout(() => setFormValidationError(VALIDATION_ERRORS.VALID), 4000);
			return;
		}

		if (!validatePassword(password)) {
			setFormValidationError(VALIDATION_ERRORS.PASS_VALIDATE);
			setTimeout(() => setFormValidationError(VALIDATION_ERRORS.VALID), 4000);
			return;
		}

		if (password !== confirmPassword) {
			setFormValidationError(VALIDATION_ERRORS.PASS_MATCH);
			setTimeout(() => setFormValidationError(VALIDATION_ERRORS.VALID), 4000);

			return;
		}
		signUpUser(username, email, password, () => navigate("/login"));

		console.log("SUBMIT");
	};

	return (
		<div className="flex items-center justify-center h-screen flex-col ">
			<h1 className="font-extrabold text-xl mb-10">
				Welcome To Our Family :&#41;
			</h1>

			{formValidationError !== VALIDATION_ERRORS.VALID && (
				<span className="text-red-500 transition-all duration-100">
					{formValidationError}
				</span>
			)}
			{authError && (
				<span className="text-red-500 transition-all duration-100">
					{authError}
				</span>
			)}

			<form onSubmit={handleSignUp} className="flex flex-col items-center">
				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-3">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Username
					</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUserName(e.target.value)
						}
						type="text"
						value={username}
						placeholder="Eg: Radha, Krsna.."
						className="rounded  px-3 py-2 w-full bg-transparent border-gray-500 border-2"
					/>
				</div>

				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-3">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Email Id
					</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						value={email}
						autoComplete="off"
						type="email"
						placeholder="Eg: radha@gmail.com"
						className="rounded  px-3 py-2 w-full bg-transparent border-gray-500 border-2"
					/>
				</div>

				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-3">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Password
					</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value);
						}}
						type="password"
						autoComplete="off"
						value={password}
						placeholder="Password"
						className="rounded  px-3 py-2 w-full bg-transparent border-gray-500 border-2"
					/>
				</div>

				<div className="md:px-0 md:w-[400px] w-screen px-5 mb-3">
					<label className="block text-sm my-3 font-bold" htmlFor="">
						Confirm Password
					</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setConfirmPassword(e.target.value)
						}
						type="password"
						value={confirmPassword}
						placeholder="Confirm Password"
						className="rounded  px-3 py-2 w-full bg-transparent border-gray-500 border-2"
					/>
				</div>

				<input
					type="submit"
					value="SignUp"
					className="mt-3 bg-green-600 rounded-full w-1/2 px-6 py-2 cursor-pointer"
				/>
			</form>

			<div className="mt-2">
				<Link to={"/login"} className="cursor-pointer">
					<span className="text-gray-500 hover:text-gray-200 transition-color duration-100">
						Already have an account? Click here to login.
					</span>
				</Link>
			</div>
		</div>
	);
};

export default SignUp;
