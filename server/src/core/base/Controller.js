import _ from "lodash";
import pluralize from "pluralize";
import debug from "debug";

const log = debug("therion:server:Controller");

class Controller {
	constructor(model) {
		this._model = model;

		log("therion:server:Controller");
	}

	get model() {
		return this._model;
	}

	getQuery = () => {
		const query = {};
		const model = this._model;
		const modelName = _.camelCase(model.name);

		query[`${ modelName }`] = (obj, args) => {
			args.where = !args.where || JSON.parse(args.where);

			if (args.id) {
				return model.findById(args.id);
			}

			return model.findOne({ ...args });
		};

		query[`${ pluralize.plural(modelName) }`] = async (obj, args) => {
			args.where = !args.where || JSON.parse(args.where);

			return model.findAndCountAll({ ...args });
		};

		return query;
	}

	getQuerySchema = () => {
		const model = this._model;
		const modelName = _.camelCase(model.name);
		const formalModelName = _.capitalize(model.name);

		return `
			${ modelName }(action: Action, where: Json, offset: Int, limit: Int, sort: String, id: Int): ${ formalModelName }
			${ pluralize.plural(modelName) }(action: Action, where: Json, offset: Int, limit: Int, sort: String): ${ formalModelName }WithCount
		`;
	}
}

export default Controller;
