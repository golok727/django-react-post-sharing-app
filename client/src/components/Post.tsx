import React, { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, User } from "../context/AuthContext";
import { Heart } from "../assets/heart";

export interface PostType {
	id: number;
	title: string;
	description: string;
	likes: number;
	created: string;
	updated_at: string;
	user: User;
	likes_fld: number[];
}

interface Props {
	post: PostType;
}
const Post: React.FC<Props> = ({ post }) => {
	const { user } = useContext(AuthContext);
	const [liked, setLiked] = useState(
		user ? post.likes_fld.find((i) => i === user.id) : false
	);
	const [likes, setLikes] = useState(post.likes_fld.length);

	const formatDate = useCallback(
		(date: string) => {
			const formatter = new Intl.DateTimeFormat("en", {
				dateStyle: "medium",
				// month: "short",
			});
			return formatter.format(new Date(date));
		},
		[post]
	);

	const numberFormatter = useCallback(
		(val: number) => {
			const formatter = new Intl.NumberFormat("en", {
				notation: "compact",
			});
			return formatter.format(val);
		},
		[post]
	);

	const handleLikeButton = () => {
		if (!liked) setLikes((count) => (count += 1));
		else setLikes((count) => (count -= 1));
		setLiked((prev) => !prev);
	};

	return (
		<div className="bg-slate-950 py-4 px-4 rounded-md border-[1px] border-gray-600 hover:border-gray-500 transition-all duration-150 bo md:mx-0 mx-2 ">
			<header className="w-full flex gap-3">
				<div className="w-10 h-10 bg-cyan-950 rounded-full text-white font-bold text-xl grid place-items-center select-none border-blue-200 border-[1px]">
					{post.user.username.charAt(0).toUpperCase()}
				</div>
				<div className="flex-1 w-full">
					<Link to={`/${post.user.username}`}>
						<span
							className={`hover:underline font-bold test-xl ${
								post.user.id === user?.id && "text-green-400"
							}`}
						>
							@{post.user.username}
						</span>
					</Link>
					<span className="mx-2 text-sm text-gray-400">
						{formatDate(post.created)}
					</span>
					<section className="my-4  font-sm">{post.description}</section>
				</div>
			</header>
			<footer className="">
				<div>
					<span className="flex gap-1 text-gray-300 items-center cursor-pointer">
						<Heart
							isActive={liked}
							className="hover:scale-105 w-6 h-6"
							onClick={() => handleLikeButton()}
						/>
						<span className="text-sm select-none">
							{numberFormatter(likes)}
						</span>
					</span>
				</div>
			</footer>
		</div>
	);
};

export default Post;
