import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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
