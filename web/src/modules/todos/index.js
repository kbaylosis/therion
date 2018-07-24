import React from "react";
import loadable from "react-loadable";

import Loading from "__src/components/Loading";

import reducers from "./reducers";

export const todos = reducers;

export default [{
	exact: true,
	path: "/todos",
	component: loadable({
		loader: () => import("./containers/Todos"),
		loading: () => (<Loading/>),
	}),
}];
