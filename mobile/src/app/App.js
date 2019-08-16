import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";

import AppReducer from "./reducers";
import AppNavigator from "./navigator";

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = createStore(AppReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => (
	<Provider store={store}>
		<AppNavigator />
	</Provider>
);

export default App;
