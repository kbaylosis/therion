import React from "react";
import loadable from "react-loadable";

import Loading from "__src/components/Loading";

// import reducers from "./reducers";

// export const dashboard = reducers;

export default [{
	exact: true,
	path: "/",
	component: loadable({
		loader: () => import("./containers/Dashboard"),
		loading: () => (<Loading/>),
	}),
}];
