class ApiError extends Error {
	constructor(e = [], code) {
		super(`${e.length} error/s found!`);

		this._errors = e;
		this._code = code;
	}

	get errors() {
		return this._errors;
	}

	get code() {
		return this._code;
	}
}

export default ApiError;
