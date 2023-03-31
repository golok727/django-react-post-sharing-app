import React from "react";
import Post from "./Post";
import { __posts__ } from "../utils/const";
const Posts: React.FC = () => {
	return (
		<div className="pt-20 h-screen container mx-auto max-w-3xl lg:max-w-5xl flex flex-col gap-2 ">
			{__posts__.map((post, i) => (
				<Post post={post} key={i} />
			))}
		</div>
	);
};

export default Posts;
