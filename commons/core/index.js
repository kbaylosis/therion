import Reducer from "./base/Reducer";
import QueryUtils from "./base/QueryUtils";
import ApiFactory from "./managers/ApiFactory";
import RequestManager from "./managers/RequestManager";

class Therion {
	constructor(modelDefs, config) {
		this._requestManager = new RequestManager(config);
		this._apiFactory = new ApiFactory(modelDefs, this._requestManager);
		this._queryUtils = new QueryUtils();
	}

	get ApiFactory() {
		return this._apiFactory;
	}

	get RequestManager() {
		return this._requestManager;
	}

	get QueryUtils() {
		return this._queryUtils;
	}

	getDbActions = () => this._apiFactory.actions;
	createDbReducer = (id) => new Reducer(id).handle;
}

export default Therion;
