import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { bindActionCreators } from "redux";
import {
	reduxifyNavigator,
	createReactNavigationReduxMiddleware,
	createNavigationReducer,
} from "react-navigation-redux-helpers";

import { therion } from "__src/globals";

import Splash from "../modules/splash";
import Login from "../modules/login";
import Home from "../modules/home";

const AppNavigator = createStackNavigator({
	Splash,
	Login,
	Home,
});

export const nav = createNavigationReducer(AppNavigator);

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

class AppNavigatorWrapper extends PureComponent {
	static router = AppNavigator.router

	static propTypes = {
		nav: PropTypes.object,
		db: PropTypes.object,
	}

	render() {
		const { nav, db } = this.props;

		return <AppNavigator nav={ nav } screenProps={{ db }} />;
	}
}

export default connect()(
	reduxifyNavigator(
		connect(mapStateToProps, mapDispatchToProps)(AppNavigatorWrapper),
		"root"
	));
