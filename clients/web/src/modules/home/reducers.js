import { combineReducers } from "redux";

import * as Types from "./types";

const employees = (state = [], action) => {
	switch (action.type) {
	case Types.LIST_EMPLOYEES_DONE:
		return action.list;
	default:
		return state;
	}
};

const timelogs = (state = [], action) => {
	switch (action.type) {
	case Types.LIST_TIMELOGS_DONE:
		return action.list;
	default:
		return state;
	}
};

export default combineReducers({
	employees,
	timelogs,
});
