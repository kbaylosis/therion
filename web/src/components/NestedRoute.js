import React from "react";
import {
	Route,
} from "react-router-dom";

const NestedRoute = ({ exact, path, component: Component, routes, screenProps }) => (
	<Route exact={ exact } path={ path } render={(props) => (
		// pass the sub-routes down to keep nesting
		<Component { ...props } routes={ routes } screenProps={ screenProps } />
	)}/>
);

export default NestedRoute;
