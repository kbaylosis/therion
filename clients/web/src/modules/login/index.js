import React from "react";
import loadable from "react-loadable";

import Loading from "__src/components/Loading";

// import reducers from "./reducers";

// export const login = reducers;

export default [{
	path: "/login",
	component: loadable({
		loader: () => import("./containers/Login"),
		loading: () => (<Loading/>),
	}),
}];
