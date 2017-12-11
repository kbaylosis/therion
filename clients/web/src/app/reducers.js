import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

// import { login } from "../modules/login";
// import { home } from "../modules/home";
// import { dashboard } from "../modules/dashboard";
import { todos } from "../modules/todos";

const reducer = combineReducers({
	// login,
	// home,
	// dashboard,
	todos,
	router: routerReducer,
});

export default reducer;
