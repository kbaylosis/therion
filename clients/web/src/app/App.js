import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";

import AppReducer from "./reducers";
import AppNavigator from "./navigator";
import "./styles.less";
import "./styles.scss";

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = createStore(AppReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppNavigator/>
			</Provider>
		);
	}
}
