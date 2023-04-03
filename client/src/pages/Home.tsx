import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import { AuthContext } from "../context/AuthContext";
const Home: React.FC = () => {
	return (
		<div className="">
			<Navbar />

			<Posts />
		</div>
	);
};

export default Home;
