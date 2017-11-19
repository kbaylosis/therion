import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";

import AppReducer from "./reducers";
import logo from "../assets/logo.svg";
import "./styles.css";

import Todo from "../modules/todo";

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = createStore(AppReducer,
	composeEnhancers(applyMiddleware(thunk))
);

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
					<Todo />
				</div>
			</Provider>
		);
	}
}
