import React, { createContext, useContext, useEffect, useReducer } from "react";
import { PostType } from "../components/Post";
import PostsReducer, { ActionType } from "./PostsReducer";
import { AuthContext, AuthProvider } from "./AuthContext";

export interface PostsContextType {
	posts: PostType[];
}

const PostsContext = createContext<PostsContextType>(null!);
export default PostsContext;

interface Props {
	children: React.ReactNode;
}

export const PostsProvider: React.FC<Props> = ({ children }) => {
	const { user } = useContext(AuthContext);
	const { tokens } = useContext(AuthContext);

	const [state, dispatch] = useReducer(PostsReducer, { posts: [] });

	const fetchPosts = async () => {
		if (user) {
			const token_value = `Bearer ${tokens?.access as string}`;
			const res = await fetch("/api/posts", {
				method: "GET",
				headers: {
					Authorization: token_value,
				},
			});

			const data = await res.json();
			if (res.status === 200) {
				dispatch({ type: ActionType.SET_POSTS, payload: { posts: data } });
			} else {
				alert("Something went wrong!!!");
			}
		}
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	const contextData: PostsContextType = state;
	return (
		<PostsContext.Provider value={contextData}>
			{children}
		</PostsContext.Provider>
	);
};
