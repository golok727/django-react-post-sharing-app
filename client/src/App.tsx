import React from "react";
import Main from "./components/AppContainer";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "",
				element: <div>Home Page</div>,
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
