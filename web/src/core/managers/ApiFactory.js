import _ from "lodash";

import Api from "../base/Api";

class ApiFactory {
	constructor(modelDefs) {
		_.transform(modelDefs, (r, v, k) => {
			this[k] = new Api(k);
		}, {});

		console.log(this);
	}
}

export default ApiFactory;
