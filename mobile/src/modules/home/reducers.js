import { combineReducers } from "redux";

import * as ReactNavigationTypes from "__proj/__globals__/ReactNavigationTypes";
import * as Types from "./types";

const loggedOut = (state = {}, action) => {
	switch (action.type) {
	case Types.LOGOUT:
		return true;
	case ReactNavigationTypes.BACK:
		return false;
	default:
		return state;
	}
};

export default combineReducers({
	loggedOut,
});
