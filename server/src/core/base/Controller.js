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
				const { action, values: v, options: o } = args;
				const values = !v || JSON.parse(v);
				const options = !o || JSON.parse(o);

				switch (action) {
				case Action.CREATE:
				default: {
					const { dataValues } = await this._obj("create").create(values, options);

					record = dataValues;
					break;
				}
				case Action.READ: {
					const [ r ] = await this._obj("findOrCreate").findOrCreate(options);

					record = r;
					break;
				}
				case Action.UPSERT: {
					await this._obj("upsert").upsert(values, options);

					// Do not auto fetch record from database since it might return the wrong one
					options.returning = false;
					break;
				}
				case Action.UPDATE: {
					options.limit = 1;
					const [ affectedRows, affectedCount ] = await this._obj("update").update(values, options);

					if (affectedCount && affectedRows) {
						record = affectedRows[0];
					}
					break;
				}
				case Action.DELETE: {
					await this._obj("destroy").destroy(options);

					// Do not auto fetch the record from database since it is already non existent
					options.returning = false;
					break;
				}}

				if (!record && options.returning) {
					record = await this._obj("findOne").findOne({ where: options.where });
				}
			} catch (e) {
				log(e);

				record = null;
			}

			log(record);
			return record;
		};

		mutation[`${ pluralize.plural(modelName) }`] = async (obj, args) => {
			let count, rows;

			try {
				const { action, values: v, options: o } = args;
				const values = !v || JSON.parse(v);
				const options = !o || JSON.parse(o);

				switch (action) {
				case Action.CREATE:
					rows = await this._obj("bulkCreate").update(values, options);
					count = rows.length;
					break;
				case Action.READ:
				case Action.UPSERT:
				default:
					// Do nothing since it's not meaningful to do these operations on multiple records
					return null;
				case Action.UPDATE: {
					const [ affectedRows, affectedCount ] = await this._obj("update").update(values, options);

					count = affectedCount;
					rows = affectedRows;
					break;
				}
				case Action.DELETE: {
					count = await this._obj("destroy").destroy(args);

					// Do not auto fetch the record from database since it is already non existent
					options.returning = false;
					break;
				}}

				log(rows);
				if (!rows && options.returning) {
					rows = await this._obj("findAll").findAll(options);
					count = rows.length;
				}
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
