import * as ActionTypes from "./ActionTypes";

class Reducer {
	constructor(id) {
		this._id = id;
	}

	handle = (state = {}, { type, id, result, errors }) => {
		if (this._id !== id) {
			return state;
		}

		// eslint-disable-next-line no-console
		console.log(type);

		switch (type) {
		case ActionTypes.ONGOING:
			return { id };
		case ActionTypes.DONE:
			return { id, result };
		case ActionTypes.ERROR:
			return { id, errors };
		default:
			return state;
		}
	}
}

export default Reducer;
