import Reducer from "./base/Reducer";
import ApiFactory from "./managers/ApiFactory";
import RequestManager from "./managers/RequestManager";

class Therion {
	constructor(modelDefs, config) {
		this._requestManager = new RequestManager(config);
		this._apiFactory = new ApiFactory(modelDefs, this._requestManager);
	}

	get ApiFactory() {
		return this._apiFactory;
	}

	get RequestManager() {
		return this._requestManager;
	}

	getDbActions = () => this._apiFactory.actions;
	createDbReducer = (id) => new Reducer(id).handle;
}

export default Therion;
