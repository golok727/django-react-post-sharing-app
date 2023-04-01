import { PostType } from "../components/Post";
import { PostsContextType } from "./PostsContext";

export enum ActionType {}

type Action = {
	type: ActionType;
	payload: Partial<PostsContextType>;
};

const PostsReducer = (state: PostsContextType, action: Action) => {
	const { payload, type } = action;
	switch (type) {
		default:
			return state;
	}
};
export default PostsReducer;
