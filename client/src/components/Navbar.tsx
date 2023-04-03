import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { user, logoutUser } = useContext(AuthContext);
	return (
		<div className="w-full border-b-[1px] border-gray-600 bg-slate-900 px-3 py-3 fixed top-0 z-100">
			<div className="container max-w-2xl mx-auto flex justify-between items-center">
				<h1 className="font-bold">
					Welcome{" "}
					<span className="text-xl capitalize text-green-400">
						{user?.username}
					</span>
				</h1>
				<ul className="flex gap-2">
					<li>
						<Link
							className=" rounded-full text-white hover:scale-105 font-bold transition-all duration-200"
							to=""
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
								/>
							</svg>
						</Link>
					</li>

					<li>
						<Link
							className=" rounded-full text-white hover:scale-105 font-bold transition-all duration-200"
							to="/dashboard"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</Link>
					</li>
				</ul>
				<button
					onClick={() => logoutUser()}
					className="bg-red-500 px-4 py-2 rounded-full text-white font-bold hover:bg-red-600 transition-all duration-200"
				>
					<span className="">Logout</span>
				</button>
			</div>
		</div>
	);
};

export default Navbar;
