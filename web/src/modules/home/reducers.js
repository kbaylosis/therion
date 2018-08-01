import { combineReducers } from "redux";

import { therion } from "__src/globals";

export default combineReducers({
	homeUser: therion.createDbReducer("home/user"),
});
