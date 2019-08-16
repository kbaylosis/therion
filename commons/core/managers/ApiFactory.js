import _ from "lodash";

import Api from "../base/Api";
import Actions from "../base/Actions";

class ApiFactory {
	constructor(modelDefs, requestManager) {
		this._actions = _.transform(
			modelDefs,
			(r, v, k) => {
				const api = new Api(k, requestManager);

				this[k] = api;
				r = _.assign(r, new Actions(api).ops);
			},
			{},
		);
	}

	get actions() {
		return this._actions;
	}
}

export default ApiFactory;
