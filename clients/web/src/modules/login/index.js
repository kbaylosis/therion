import React from "react";
import Loadable from "react-loadable";

import Loading from "__src/components/Loading";

// import reducers from "./reducers";

// export const login = reducers;

export default [{
	path: "/login",
	// eslint-disable-next-line new-cap
	component: Loadable({
		loader: () => import("./containers/Login"),
		loading: () => (<Loading/>),
	}),
}];
