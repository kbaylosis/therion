import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Expo from "expo";

import AppReducer from "./reducers";
import AppNavigator from "./navigator";

import Roboto from "native-base/Fonts/Roboto.ttf";
import RobotoMedium from "native-base/Fonts/Roboto_medium.ttf";

let store = createStore(AppReducer, applyMiddleware(logger, thunk));

export default class App extends React.Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto,
      "Roboto_medium" : RobotoMedium
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
