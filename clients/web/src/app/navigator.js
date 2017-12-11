import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
} from "react-router-dom";

import NestedRoute from "__src/components/NestedRoute";
import Login from "__src/modules/login";
import Home from "__src/modules/home";

const routes = [
	...Login,
	...Home,
];

class AppNavigator extends PureComponent {
	render() {
		return (
			<Router>
				<div id="navigator">
					<Switch>
						{
							routes.map((route, index) => {
								return (
									<NestedRoute { ...route } key={ index } />
								);
							})
						}
					</Switch>
				</div>
			</Router>
		);
	}
}

AppNavigator.propTypes = {
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(AppNavigator);
