import React, { PureComponent } from "react";
import PropTypes from "prop-types";
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

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
	db: bindActionCreators(globals.ApiFactory.actions, dispatch),
});

class AppNavigator extends PureComponent {
	static propTypes = {
		db: PropTypes.object,
	};

	render() {
		const { db } = this.props;

		return (
			<ConnectedRouter { ...this.props }>
				<div id="navigator">
					<Switch>
						{
							routes.map((route, index) => (
								<NestedRoute { ...route } key={ index } screenProps={{ db }} />
							))
						}
					</Switch>
				</div>
			</ConnectedRouter>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
