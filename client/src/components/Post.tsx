import React from "react";
import { User } from "../context/AuthContext";

export interface PostType {
	id: number;
	title: string;
	description: string;
	likes: number;
	created: string;
	updated_at: string;
	user: User;
}

interface Props {
	post: PostType;
}
const Post: React.FC<Props> = ({ post }) => {
	return (
		<div className="bg-slate-950 py-4 px-2 rounded-sm border-[1px] border-gray-500">
			Post {post.id} {post.title}
		</div>
	);
};

export default Post;
