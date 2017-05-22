import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";

import Splash from "../modules/splash";
import Login from "../modules/login";
import Home from "../modules/home";

const AppNavigator = StackNavigator({
	Splash : {
		screen : Splash
	},
	Login : {
		screen : Login
	},
	Home : {
		screen : Home
	}
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
	nav
});

const AppNavigatorUI = ({ dispatch, nav }) => (
	<AppNavigator navigation={addNavigationHelpers({
		dispatch,
		state: nav,
	})} />
);

AppNavigatorUI.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AppNavigatorUI);
