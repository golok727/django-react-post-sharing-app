import { PostType } from "../components/Post";
import { PostsContextType } from "./PostsContext";

export enum ActionType {
	SET_POSTS = "SET_POSTS",
}

type Action = {
	type: ActionType;
	payload: any;
};

const PostsReducer = (state: PostsContextType, action: Action) => {
	const { payload, type } = action;
	switch (type) {
		case ActionType.SET_POSTS:
			return {
				...state,
				posts: [...state.posts, ...payload.posts],
			};
		default:
			return state;
	}
};
export default PostsReducer;
