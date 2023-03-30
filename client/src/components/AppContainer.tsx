import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AppContainer: React.FC = () => {
	const { loading, authError } = useContext(AuthContext);

	return (
		<div className="min-h-screen bg-slate-900 text-white relative">
			{/* <h1 className="text-orange-700 font-bold">Radhey Shyam</h1> */}
			<Outlet />
			{loading && (
				<div className="bg-black bg-opacity-90 flex justify-center items-center absolute inset-[0]">
					<span
						className={`font-bold text-3xl tracking-wide ${
							authError && "hidden"
						}`}
					>
						Loading...
					</span>

					{authError && (
						<span className="text-2xl font-bold text-red-400">{authError}</span>
					)}
				</div>
			)}
		</div>
	);
};

export default AppContainer;
