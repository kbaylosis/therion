import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { bindActionCreators } from "redux";
import {
	createReduxContainer,
	createReactNavigationReduxMiddleware,
	createNavigationReducer,
} from "react-navigation-redux-helpers";

import { therion } from "__src/globals";

import Splash from "../modules/splash";
import Login from "../modules/login";
import Home from "../modules/home";

const AppNavigator = createStackNavigator({
	...Splash,
	...Login,
	...Home,
});

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
export const reactNavigation = createReactNavigationReduxMiddleware(
	"root",
	({ nav }) => nav,
);

const mapStateToProps = ({ nav }) => ({
	nav,
});

const mapDispatchToProps = (dispatch) => ({
	db: bindActionCreators(therion.ApiFactory.actions, dispatch),
});

const AppContainer = createAppContainer(AppNavigator);

class AppNavigatorWrapper extends PureComponent {
	static router = AppNavigator.router;

	static propTypes = {
		nav: PropTypes.object,
		db: PropTypes.object,
	};

	render() {
		const { nav, db } = this.props;

		return <AppContainer nav={nav} screenProps={{ db }} />;
	}
}

export const nav = createNavigationReducer(AppNavigator);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(createReduxContainer(AppNavigatorWrapper, "root"));
