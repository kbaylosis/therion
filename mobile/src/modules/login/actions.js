import * as Types from "./types";

export const loginSuccess = (data) => ({
	type: Types.LOGIN_SUCCESS,
	data,
});

export const loginFailed = (error) => ({
	type: Types.LOGIN_FAILED,
	error,
});

export const loginInProgress = () => (
	(dispatch) => {
		dispatch({
			type: Types.LOGIN_INPROGRESS,
		});
		setTimeout(() => {
			dispatch(loginSuccess({
				email: "john.doe@gmail.com",
				firstname: "John",
				lastname: "Doe",
			}));
		}, 3000);
	}
);
