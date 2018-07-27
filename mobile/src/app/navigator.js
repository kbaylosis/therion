import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StackNavigator } from "react-navigation";
import { bindActionCreators } from "redux";

import * as globals from "__src/globals";

import Splash from "../modules/splash";
import Login from "../modules/login";
import Home from "../modules/home";

const AppNavigator = StackNavigator({
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

const initialState = AppNavigator
	.router.getStateForAction(
		AppNavigator.router.getActionForPathAndParams("Splash"));

export const nav = (state = initialState, action) => {
	const nextState = AppNavigator.router.getStateForAction(action, state);

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
};

const mapStateToProps = ({ nav }) => ({
	nav,
});

const mapDispatchToProps = (dispatch) => ({
	dispatch,
	db: bindActionCreators(globals.ApiFactory.actions, dispatch),
});

// on Android, the URI prefix typically contains a host in addition to scheme
const uriPrefix = (Platform.OS === "android") ? "mychat://mychat/" : "mychat://";

const AppNavigatorUI = ({ dispatch, nav, db }) => (
	<AppNavigator navigation={{
		dispatch,
		state: nav,
		uriPrefix,
	}} screenProps={{ db }} />
);

AppNavigatorUI.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired,
	db: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigatorUI);
