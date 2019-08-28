import { combineReducers } from "redux";

import { therion } from "__src/globals";

import * as ReactNavigationTypes from "__src/commons/ReactNavigationTypes";
import * as Types from "./types";

const loggedOut = (state = false, action) => {
	switch (action.type) {
	case Types.LOGGED_IN:
	case Types.LOGOUT_INPROGRESS:
		return false;
	case Types.LOGGEDOUT:
	case ReactNavigationTypes.BACK:
		return true;
	default:
		return state;
	}
};

export default combineReducers({
	loggedOut,
	homeUser: therion.createDbReducer("home/user"),
});
