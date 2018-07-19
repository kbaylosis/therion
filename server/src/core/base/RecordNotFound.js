
class RecordNotFound extends Error {
	constructor(message="Record not found!") {
		super(message);

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, RecordNotFound);
		}

		this.name = "RecordNotFound";
		this.code = 404;
	}
}

export default RecordNotFound;
