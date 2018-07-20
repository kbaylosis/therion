import _ from "lodash";

import Api from "../base/Api";

class ApiFactory {
	constructor(modelDefs) {
		this._api = _.transform(modelDefs, (r, v, k) => {
			r[k] = new Api(k);
		}, {});
	}

	get api() {
		return this._api;
	}
}

export default ApiFactory;
