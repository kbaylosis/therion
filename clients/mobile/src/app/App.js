import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import Expo from "expo";

import AppReducer from "./reducers";
import AppNavigator from "./navigator";

import Roboto from "native-base/Fonts/Roboto.ttf";
import RobotoMedium from "native-base/Fonts/Roboto_medium.ttf";

const composeEnhancers = composeWithDevTools({ realtime: true });
let store = createStore(AppReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default class App extends Component {

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
