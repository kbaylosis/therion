import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	Switch,
} from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import NestedRoute from "__src/components/NestedRoute";
import Login from "__src/modules/login";
import Registration from "__src/modules/registration";
import Home from "__src/modules/home";

const routes = [
	...Login,
	...Registration,
	...Home,
];

class AppNavigator extends PureComponent {
	render() {
		return (
			<ConnectedRouter { ...this.props }>
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
			</ConnectedRouter>
		);
	}
}

AppNavigator.propTypes = {
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(AppNavigator);
