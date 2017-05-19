import React from "react";
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

class AppNavigatorUI extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

export default connect(mapStateToProps)(AppNavigatorUI);
