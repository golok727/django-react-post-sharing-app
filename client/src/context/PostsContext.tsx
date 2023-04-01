import React, { createContext, useReducer } from "react";
import { PostType } from "../components/Post";
import PostsReducer from "./PostsReducer";

export interface PostsContextType {
	posts: PostType[];
}

const PostsContext = createContext<PostsContextType>(null!);
export default PostsContext;

interface Props {
	children: React.ReactNode;
}

export const PostsProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(PostsReducer, { posts: [] });

	const contextData: PostsContextType = state;
	return (
		<PostsContext.Provider value={contextData}>
			{children}
		</PostsContext.Provider>
	);
};
