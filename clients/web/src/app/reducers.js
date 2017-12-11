import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

// import { login } from "../modules/login";
import { home } from "../modules/home";

const reducer = combineReducers({
	// ...login,
	...home,
	router: routerReducer,
});

export default reducer;
