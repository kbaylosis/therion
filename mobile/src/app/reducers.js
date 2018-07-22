import { combineReducers } from "redux";

import { nav } from "./navigator";
import { login } from "../modules/login";
import { home } from "../modules/home";

const reducer = combineReducers({
	nav,
	login,
	home,
});

export default reducer;
