import React from "react";
import { Platform, Component } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { bindActionCreators } from "redux";
import {
	reduxifyNavigator,
	createReactNavigationReduxMiddleware,
	createNavigationReducer,
} from "react-navigation-redux-helpers";

import * as globals from "__src/globals";

import Splash from "../modules/splash";
import Login from "../modules/login";
import Home from "../modules/home";

const AppNavigator = createStackNavigator({
	Splash: {
		screen: Splash,
	},
	Login: {
		screen: Login,
	},
	Home: {
		screen: Home,
	},
});

export const nav = createNavigationReducer(AppNavigator);

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
export const reactNavigation = createReactNavigationReduxMiddleware(
	"root",
	({ nav }) => nav,
);

const mapStateToProps = ({ nav }) => ({
	state: nav,
});

const mapDispatchToProps = (dispatch) => ({
	dispatch,
	// db: bindActionCreators(globals.ApiFactory.actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxifyNavigator(AppNavigator, "root")
);
