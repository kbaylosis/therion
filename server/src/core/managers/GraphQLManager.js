import _ from "lodash";
import { attributeFields } from "graphql-sequelize";
import debug from "debug";

import Controller from "../base/Controller";

const log = debug("therion:server:GraphQLManager");

class GraphQLManager {
	initialize = (models, controllers) => {
		this._models = models;
		this._controllers = _.transform(models, (r, v, k) => {
			const type = controllers[k] || Controller;
			const obj = new type(v);

			r[k] = _.assignIn(new Controller(v), r[k], obj.getQuery());
			log(r[k]);
		}, {});
		this._query = this._getQuery();
		this._querySchema = this._getQuerySchema();
		this._customTypesSchema = this._getCustomTypesSchema();

		return this;
	}

	get query() {
		return this._query;
	}

	get querySchema() {
		return this._querySchema;
	}

	get customTypesSchema() {
		return this._customTypesSchema;
	}

	getMutationSchema = () => {
		const mutation = _.transform(this._controllers, (r, v) => {
			r.push(v.getQuerySchema());
		}, []).join("\n");

		return `
		type Mutation {
			${ mutation }
		}
		`;
	}

	_getQuery = () => {
		const query = {};

		_.map(this._controllers, (v) => {
			_.assignIn(query, v.getQuery());
		});

		return query;
	}

	_getQuerySchema = () => {
		const query = _.transform(this._controllers, (r, v) => {
			r.push(v.getQuerySchema());
		}, []).join("\n");

		log(query);

		return `
		type Query {
			${ query }
		}
		`;
	}

	_getCustomTypesSchema = () => {
		return _.transform(this._models, (gType, model, name) => {
			const attributes = _.transform(attributeFields(model), (r, v, k) => {
				r.push(`
					${ k }: ${ v.type }
				`);
			}, []).join("\n");

			gType.push(`
	type ${ name } {
	${ attributes }
	}

	type ${ name }WithCount {
		count: Int!
		rows: [ ${ name } ]
	}`, []);
		}, []).join("\n");
	}
}

export default GraphQLManager;
