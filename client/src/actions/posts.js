import * as api from "../api";

// Action  Creators - functions that return an action
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();

		dispatch({ type: "FETCH_ALL", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);

		dispatch({ type: "CREATE", payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, postData) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, postData);

		dispatch({ type: "UPDATE", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
