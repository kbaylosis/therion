import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux"

import AppReducer from "./reducers";
import logo from "../assets/logo.svg";
import "./styles.css";

let store = createStore(AppReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Provider>
    );
  }
}
