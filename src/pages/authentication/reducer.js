import {
	AUTHENTICATE
} from "./actions";

const initialState = {
	loading: false,
	loggedIn: false,
};

export const loginReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				...state,
				loading: action.loading,
			};
		default:
			return state;
	}
};