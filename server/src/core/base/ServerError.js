import { GraphQLError, printError } from "graphql";
import _ from "lodash";

class ServerError extends GraphQLError {
	constructor(e, code) {
		super(e.message);

		const name = _.replace(e.name, "Sequelize", "");

		if (!code) {
			switch(name) {
			case "AssociationError":
			case "QueryError":
			case "UniqueConstraintError":
			case "ValidationError":
			case "ValidationErrorItem":
				code = 400;
				break;
			case "EmptyResultError":
				code = 404;
				break;
			case "TimeoutError":
				code = 408;
				break;
			default:
				if (e.code) {
					code = e.code;
				} else {
					code = 500;
				}
			}
		}

		this.message = {
			code,
			name,
			message: e.message,
		};

		if (process.env.NODE_ENV !== "production") {
			this.stack = e.stack;
		}
	}

	toString = () => {
		return printError(this);
	}
}

export default ServerError;
