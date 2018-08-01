import React from "react";
import loadable from "react-loadable";

import Loading from "__src/components/Loading";
import Dashboard from "__src/modules/dashboard";
import Todos, { todos } from "__src/modules/todos";

import reducer from "./reducers";

export const home = {
	home: reducer,
	todos,
};

export default [{
	path: "/",
	component: loadable({
		loader: () => import("./containers/Home"),
		loading: () => (<Loading/>),
	}),
	routes: [
		...Dashboard,
		...Todos,
	],
}];
