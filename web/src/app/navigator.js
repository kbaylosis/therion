import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	Switch,
} from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { bindActionCreators } from "redux";

import * as globals from "__src/globals";

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
			<ConnectedRouter { ...this.props }>
				<div id="navigator">
					<Switch>
						{
							routes.map((route, index) => (
								<NestedRoute { ...route } key={ index } db={ this.props.db } />
							))
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

const mapDispatchToProps = (dispatch) => ({
	db: bindActionCreators(globals.ApiFactory.actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
