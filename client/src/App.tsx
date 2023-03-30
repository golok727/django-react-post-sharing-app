import React from "react";
import Main from "./components/AppContainer";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "",
				element: (
					<ProtectedRoute>
						<div>Hello</div>
					</ProtectedRoute>
				),
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
