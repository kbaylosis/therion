import _ from "lodash";
import pluralize from "pluralize";
import debug from "debug";

import QueryUtils from "./QueryUtils";
import RecordNotFound from "./RecordNotFound";
import ServerError from "./ServerError";
import Action from "../resolvers/Action";

const log = debug("therion:server:Controller");

class Controller {
	constructor(model, modelDef) {
		this._model = model;
		this._modelDef = modelDef;
	}

	get model() {
		return this._model;
	}

	_obj = (method) => (this[method] ? this : this._model);

	getQuery = () => {
		const query = {};
		const modelName = _.camelCase(this._model.name);
		const modelDef = this._modelDef;

		query[`${ modelName }`] = async (obj, args, context) => {
			let record;

			try {
				if (args.id) {
					record = await this._obj("findById").findById(args.id, args.options, context);
				} else {
					const { where="{}", order="[]", options="{}" } = args;

					args.where = new QueryUtils().where(where);
					args.order = _.isString(order) ? JSON.parse(order) : order;
					delete args.options;
					_.assign(args, _.isString(options) ? JSON.parse(options) : options);
					args.include = modelDef.associations ? Object.keys(modelDef.associations) : [];

					record = await this._obj("findOne").findOne(args, context);
				}

				if (!record) {
					throw new RecordNotFound();
				}
			} catch (e) {
				log(e);

				throw new ServerError(e);
			}

			return record;
		};

		query[`${ pluralize.plural(modelName) }`] = async (obj, args, context) => {
			let count, rows;
			const { action, offset, limit, where="{}", order="[]", options="{}" } = args;

			try {
				args.where = new QueryUtils().where(where);
				args.order = _.isString(order) ? JSON.parse(order) : order;
				delete args.options;
				_.assign(args, _.isString(options) ? JSON.parse(options) : options);
				args.include = modelDef.associations ? Object.keys(modelDef.associations) : [];

				if (action === Action.COUNT) {
					const result = await this._obj("findAndCountAll").findAndCount(args, context);

					count = result.count;
					rows = result.rows;
				} else {
					rows = await this._obj("findAll").findAll(args, context);
				}
			} catch (e) {
				log(e);

				throw new ServerError(e);
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
		const modelDef = this._modelDef;

		mutation[`${ modelName }`] = async (obj, args, context) => {
			let record;

			try {
				const { action, values: v="{}", options: o="{}" } = args;
				const values = _.isString(v) ? JSON.parse(v) : v;
				const options = _.isString(o) ? JSON.parse(o) : o;

				options.include = Object.keys(modelDef.associations);

				switch (action) {
				case Action.CREATE:
				default: {
					record = await this._obj("create").create(values, options, context);
					break;
				}
				case Action.READ: {
					const [ r ] = await this._obj("findOrCreate").findOrCreate(options, context);

					record = r;
					break;
				}
				case Action.UPSERT: {
					await this._obj("upsert").upsert(values, options, context);

					// Do not auto fetch record from database since it might return the wrong one
					options.returning = false;
					break;
				}
				case Action.UPDATE: {
					const { include, where="{}" } = options;

					delete options.include;
					options.where = new QueryUtils().where(where);
					options.limit = 1;
					const [ affectedRows, affectedCount ] = await this._obj("update").update(values, options, context);

					options.include = include;

					if (affectedCount && affectedRows) {
						record = affectedRows[0];
					}
					break;
				}
				case Action.DELETE: {
					const { where="{}" } = options;

					options.where = new QueryUtils().where(where);
					if (options.returning) {
						record = await this._obj("findOne").findOne(options, context);
					}

					const count = await this._obj("destroy").destroy(options, context);

					if (!count) {
						throw new RecordNotFound();
					}

					// Do not auto fetch the record from database since it is already non existent
					options.returning = false;
					break;
				}}

				if (!record && options.returning) {
					record = await this._obj("findOne").findOne(options, context);

					if (!record) {
						throw new RecordNotFound();
					}
				}
			} catch (e) {
				log(e);

				throw new ServerError(e);
			}

			log(record);
			return record;
		};

		mutation[`${ pluralize.plural(modelName) }`] = async (obj, args, context) => {
			let count, rows;

			try {
				const { action, values: v="{}", options: o="{}" } = args;
				const values = _.isString(v) ? JSON.parse(v) : v;
				const options = _.isString(o) ? JSON.parse(o) : o;

				options.include = Object.keys(modelDef.associations);

				switch (action) {
				case Action.CREATE:
					rows = await this._obj("bulkCreate").update(values, options, context);
					count = rows.length;
					break;
				case Action.READ:
				case Action.UPSERT:
				default:
					// Do nothing since it's not meaningful to do these operations on multiple records
					return null;
				case Action.UPDATE: {
					const { include, where="{}" } = options;

					delete options.include;
					options.where = new QueryUtils().where(where);
					const [ affectedRows, affectedCount ] =
						await this._obj("update").update(values, options, context);

					options.include = include;

					count = affectedCount;
					rows = affectedRows;
					break;
				}
				case Action.DELETE: {
					const { where="{}" } = options;

					options.where = new QueryUtils().where(where);
					if (options.returning) {
						rows = await this._obj("findAll").findAll(options, context);
						count = rows.length;
					}

					count = await this._obj("destroy").destroy(options, context);
					break;
				}}

				if (!rows && options.returning) {
					rows = await this._obj("findAll").findAll(options, context);
					count = rows.length;
				}
			} catch (e) {
				log(e);

				throw new ServerError(e);
			}

			log(rows);
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
			${ modelName }(action: Action, where: Json, offset: Int, limit: Int, order: Json, id: Int, options: Json): ${ formalModelName }
			${ pluralize.plural(modelName) }(action: Action, where: Json, offset: Int, limit: Int, order: Json, options: Json): ${ formalModelName }WithCount
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
