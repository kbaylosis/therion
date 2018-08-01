import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import createEngine from "redux-storage-engine-localstorage";
import debounce from "redux-storage-decorator-debounce";
import * as reduxStorage from "redux-storage";

import Loading from "__src/components/Loading";
import AppReducer from "./reducers";
import AppNavigator from "./navigator";
import "./styles.less";
import "./styles.scss";


const engine = debounce(createEngine("therion"), 1500);
const storage = reduxStorage.createMiddleware(engine);

const history = createHistory();
const router = routerMiddleware(history);

const composeEnhancers = composeWithDevTools({ realtime: false });
const store = createStore(
	reduxStorage.reducer(AppReducer),
	composeEnhancers(applyMiddleware(thunk, router, storage))
);

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		reduxStorage.createLoader(engine)(store)
			.then((state) => {
				console.debug("Loaded previous state: ", state);
				this.setState({
					rehydrated: true,
				});
			})
			.catch((e) => {
				console.error("Unable to restore previous state!");
				console.error(e);
			});
	}

	render() {
		if (!this.state.rehydrated) {
			return (
				<Loading />
			);
		}

		return (
			<Provider store={ store }>
				<AppNavigator history={ history }/>
			</Provider>
		);
	}
}
