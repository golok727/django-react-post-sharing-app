import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
const Home: React.FC = () => {
	return (
		<div className="">
			<Navbar />

			<Posts />
		</div>
	);
};

export default Home;
