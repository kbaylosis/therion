
class ApiError extends Error {
	constructor(message, errors) {
		super(message);

		this.errors = errors;
	}

	get errors() {
		return this._errors;
	}
}

export default ApiError;
