import React from "react";
import Loadable from "react-loadable";

import Loading from "__src/components/Loading";

import reducers from "./reducers";

export const dashboard = reducers;

export default [{
	exact: true,
	path: "/",
	// eslint-disable-next-line new-cap
	component: Loadable({
		loader: () => import("./containers/Dashboard"),
		loading: () => (<Loading/>),
	}),
}];
