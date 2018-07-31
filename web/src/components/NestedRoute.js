import React from "react";
import {
	Route,
} from "react-router-dom";

const NestedRoute = (route) => (
	<Route exact={ route.exact } path={ route.path } render={(props) => (
		// pass the sub-routes down to keep nesting
		<route.component { ...props } routes={ route.routes } screenProps={ route.screenProps } />
	)}/>
);

export default NestedRoute;
