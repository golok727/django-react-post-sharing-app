import React from "react";
import { Outlet } from "react-router-dom";

const AppContainer: React.FC = () => {
	return (
		<div className="min-h-screen bg-slate-900 text-white">
			{/* <h1 className="text-orange-700 font-bold">Radhey Shyam</h1> */}
			<Outlet />
		</div>
	);
};

export default AppContainer;
