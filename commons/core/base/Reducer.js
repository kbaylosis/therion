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
			return { id, type };
		case ActionTypes.DONE:
			return { id, type, result };
		case ActionTypes.ERROR:
			return { id, type, errors };
		default:
			return state;
		}
	}
}

export default Reducer;
