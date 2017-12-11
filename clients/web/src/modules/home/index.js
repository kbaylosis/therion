import React from "react";
import Loadable from "react-loadable";

import Dashboard from "__src/modules/dashboard";
import Todos from "__src/modules/todos";
import Loading from "__src/components/Loading";

import reducers from "./reducers";

export const home = reducers;

export default [{
	path: "/",
	// eslint-disable-next-line new-cap
	component: Loadable({
		loader: () => import("./containers/Home"),
		loading: () => (<Loading/>),
	}),
	routes: [
		...Dashboard,
		...Todos,
	],
}];
