import React, { useContext } from "react";
import Post from "./Post";
import { __posts__ } from "../utils/const";
import PostsContext from "../context/PostsContext";
const Posts: React.FC = () => {
	const { posts } = useContext(PostsContext);

	return (
		<div className="pt-20 h-screen container mx-auto max-w-3xl lg:max-w-5xl flex flex-col gap-4  ">
			{posts.map((post, i) => (
				<Post post={post} key={i} />
			))}
			<span className="text-center ">END Of Posts</span>
		</div>
	);
};

export default Posts;
