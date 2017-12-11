import React from "react";
import Loadable from "react-loadable";

import Loading from "__src/components/Loading";

import reducers from "./reducers";

export const todos = reducers;

export default [{
	exact: true,
	path: "/todos",
	// eslint-disable-next-line new-cap
	component: Loadable({
		loader: () => import("./containers/Todos"),
		loading: () => (<Loading/>),
	}),
}];
