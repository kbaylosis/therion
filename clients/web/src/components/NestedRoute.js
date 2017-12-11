import React from "react";
import {
	Route,
} from "react-router-dom";

const NestedRoute = (route) => (
	<Route exact={ route.exact } path={ route.path } render={(props) => {
		console.log(route);

		// pass the sub-routes down to keep nesting
		return (
			<route.component { ...props } routes={ route.routes }/>
		);
	}}/>
);

export default NestedRoute;
