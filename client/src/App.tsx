import React, { Children } from "react";
import Main from "./components/AppContainer";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<AuthProvider>
				<Main />
			</AuthProvider>
		),
		children: [
			{
				path: "",
				element: <ProtectedRoute />,
				children: [
					{
						path: "",
						element: <Home />,
					},
					{
						path: "",
						element: <div>Dashboard</div>,
					},
				],
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "signup",
				element: <SignUp />,
			},
		],
	},
]);

const App: React.FC = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
