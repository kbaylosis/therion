import React from "react";
import loadable from "react-loadable";

import Loading from "__src/components/Loading";
import Dashboard from "__src/modules/dashboard";

import reducers from "./reducers";

export const home = {
	home: reducers,
	// dashboard,
};

export default [{
	path: "/",
	component: loadable({
		loader: () => import("./containers/Home"),
		loading: () => (<Loading/>),
	}),
	routes: [
		...Dashboard,
	],
}];
