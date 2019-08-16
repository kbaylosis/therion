import * as Types from "./types";

export const setAsLoggedIn = () => ({
	type: Types.LOGGED_IN,
});

export const logoutInProgress = () => (dispatch) => {
	dispatch({
		type: Types.LOGOUT_INPROGRESS,
	});
	dispatch({
		type: Types.LOGGEDOUT,
	});
};
