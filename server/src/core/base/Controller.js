import _ from "lodash";
import pluralize from "pluralize";
import debug from "debug";

import Action from "../resolvers/Action";

const log = debug("therion:server:Controller");

class Controller {
	constructor(model) {
		this._model = model;
	}

	get model() {
		return this._model;
	}

	_obj = (method) => (this[method] ? this : this._model);

	getQuery = () => {
		const query = {};
		const modelName = _.camelCase(this._model.name);

		query[`${ modelName }`] = async (obj, args) => {
			args.where = !args.where || JSON.parse(args.where);

			if (args.id) {
				return await this._obj("findById").findById(args.id);
			}

			return await this._obj("findOne").findOne(args);
		};

		query[`${ pluralize.plural(modelName) }`] = async (obj, args) => {
			let count, rows;
			const { action, offset, limit } = args;

			args.where = !args.where || JSON.parse(args.where);

			if (action === Action.COUNT) {
				const result = await this._obj("findAndCountAll").findAndCountAll(args);

				count = result.count;
				rows = result.rows;
			} else {
				rows = await this._obj("findAll").findAll(args);
			}

			return {
				offset,
				limit,
				count,
				rows,
			};
		};

		return query;
	}

	getMutation = () => {
		const mutation = {};
		const modelName = _.camelCase(this._model.name);

		mutation[`${ modelName }`] = async (obj, args) => {
			let record;

			try {
				const { action, values: v, options } = args;
				const values = !v || JSON.parse(v);

				if (options) {
					options.where = !options.where || JSON.parse(options.where);
					options.default = !options.default || JSON.parse(options.default);
				}

				switch (action) {
				case Action.CREATE:
				default: {
					record = await this._obj("create").create(values, options);
					break;
				}
				case Action.READ: {
					const { created } = await this._obj("findOrCreate").findOrCreate(options);

					record = created;
					break;
				}
				case Action.UPSERT: {
					const { created } = await this._obj("upsert").upsert(values, options);

					record = created;
					break;
				}
				case Action.UPDATE: {
					options.limit = 1;
					const result = await this._obj("update").update(values, options);

					record = result[1];
					break;
				}
				case Action.DELETE: {
					await this._obj("destroy").destroy(options);

					break;
				}}
			} catch (e) {
				log(e);

				record = null;
			}

			return record;
		};

		mutation[`${ pluralize.plural(modelName) }`] = async (obj, args) => {
			let count, rows;

			try {
				const { action } = args;
				const values = !args.values || JSON.parse(args.values);

				args.where = !args.where || JSON.parse(args.where);
				args.default = !args.default || JSON.parse(args.default);

				switch (action) {
				case Action.CREATE:
				case Action.READ:
				case Action.UPSERT:
				default:
					// Do nothing since it's not meaningful to do these operations on multiple records
					break;
				case Action.UPDATE: {
					const result = await this._obj("update").update(values, args);

					count = result[0];
					rows = result[1];
					break;
				}
				case Action.DELETE: {
					await this._obj("destroy").destroy(args);

					count = 1;
					break;
				}}
			} catch (e) {
				log(e);

				count = null;
				rows = null;
			}

			return {
				count,
				rows,
			};
		};

		return mutation;
	}

	getQuerySchema = () => {
		const model = this._model;
		const modelName = _.camelCase(model.name);
		const formalModelName = _.upperFirst(model.name);

		return `
			${ modelName }(action: Action, where: Json, offset: Int, limit: Int, sort: String, id: Int): ${ formalModelName }
			${ pluralize.plural(modelName) }(action: Action, where: Json, offset: Int, limit: Int, sort: String): ${ formalModelName }WithCount
		`;
	}

	getMutationSchema = () => {
		const model = this._model;
		const modelName = _.camelCase(model.name);
		const formalModelName = _.upperFirst(model.name);

		return `
			${ modelName }(action: Action, values: Json, options: Json): ${ formalModelName }
			${ pluralize.plural(modelName) }(action: Action, values: Json, options: Json): ${ formalModelName }WithCount
		`;
	}
}

export default Controller;
