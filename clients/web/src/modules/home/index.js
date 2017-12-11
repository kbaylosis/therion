import React from "react";
import Loadable from "react-loadable";

import Loading from "__src/components/Loading";
import Dashboard from "__src/modules/dashboard";
import Todos, { todos } from "__src/modules/todos";

// import reducers from "./reducers";

export const home = {
	// home: reducers,
	// dashboard,
	todos,
};

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
