import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

import AppReducer from "./reducers";
import AppNavigator from "./navigator";
import "./styles.less";
import "./styles.scss";

const history = createHistory();
const router = routerMiddleware(history);

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = createStore(AppReducer,
	composeEnhancers(applyMiddleware(thunk, router))
);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={ store }>
				<AppNavigator history={ history }/>
			</Provider>
		);
	}
}
