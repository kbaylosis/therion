import _ from "lodash";
import pluralize from "pluralize";

import ApiError from "./ApiError";

class Api {
	constructor(name, requestManager) {
		this._name = name;
		this._pluralName = pluralize(this._name);
		this._resource = _.camelCase(this._name);
		this._resources = pluralize(this._resource);

		this._requestManager = requestManager;
	}

	get name() {
		return this._name;
	}

	//
	// Singular queries
	//

	findById = async ({ id }, attributes = [ "id" ]) => {
		const query = `
		query Find${ this._name }ById($id: Int) {
			${ this._resource }(id: $id) {
				${ this._generateAttribTree(attributes) }
			}
		}
		`;

		const variables = {
			id,
		};

		return this._execute(this._resource, query, variables);
	}

	findOne = async ({ where, options }, attributes = [ "id" ]) => {
		const query = `
		query Find${ this._name }($where: Json, $options: Json) {
			${ this._resource }(where: $where, options: $options) {
				${ this._generateAttribTree(attributes) }
			}
		}
		`;

		const variables = {
			where,
			options,
		};

		return this._execute(this._resource, query, variables);
	}

	//
	// Plural queries
	//

	findAndCount = async ({ where, offset, limit, order, options }, attributes = [ "id" ]) => {
		const query = `
		query FindAndCount${ this._pluralName }
			($where: Json, $offset: Int, $limit: Int, $order: Json, $options: Json) {
			${ this._resources }(action: COUNT, where: $where, offset: $offset,
				limit: $limit, order: $order, options: $options) {
				offset
				limit
				count
				rows {
					${ this._generateAttribTree(attributes) }
				}
			}
		}
		`;

		const variables = {
			where,
			offset,
			limit,
			order,
			options,
		};

		return this._execute(this._resources, query, variables);
	}

	findAll = async ({ where, offset, limit, order, options }, attributes = [ "id" ]) => {
		const query = `
		query FindAll${ this._pluralName }
			($where: Json, $offset: Int, $limit: Int, $order: Json, $options: Json) {
			${ this._resources }(where: $where, offset: $offset,
				limit: $limit, order: $order, options: $options) {
				offset
				limit
				rows {
					${ this._generateAttribTree(attributes) }
				}
			}
		}
		`;

		const variables = {
			where,
			offset,
			limit,
			order,
			options,
		};

		return this._execute(this._resources, query, variables);
	}

	//
	// Singular mutations
	//

	create = async ({ values, options }, attributes = [ "id" ]) => {
		const query = `
		mutation Create${ this._name }($values: Json, $options: Json) {
			${ this._resource }(action: CREATE, values: $values, options: $options) {
				${ this._generateAttribTree(attributes) }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		return this._execute(this._resource, query, variables);
	}

	findOrCreate = async ({ values, options }, attributes = [ "id" ]) => {
		const query = `
		mutation FindOrCreate{ this._name }($values: Json, $options: Json) {
			${ this._resource }(action: READ, values: $values, options: $options) {
				${ this._generateAttribTree(attributes) }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		return this._execute(this._resource, query, variables);
	}

	upsert = async ({ values, options }, attributes = [ "id" ]) => {
		const query = `
		mutation UpdateOrInsert{ this._name }($values: Json, $options: Json) {
			${ this._resource }(action: UPSERT, values: $values, options: $options) {
				${ this._generateAttribTree(attributes) }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		return this._execute(this._resource, query, variables);
	}

	//
	// Plural mutations
	//

	bulkCreate = async ({ values, options }, attributes = [ "id" ]) => {
		const query = `
		mutation BulkCreate{ this._pluralName }($values: Json, $options: Json) {
			${ this._resources }(action: CREATE, values: $values, options: $options) {
				${ this._generateAttribTree(attributes) }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		return this._execute(this._resources, query, variables);
	}

	update = async ({ values, options }, attributes = [ "id" ]) => {
		const r = (options.limit === 1) ? this._resource : this._resources;
		const query = `
		mutation Update{ this._pluralName }($values: Json, $options: Json) {
			${ r }(action: UPDATE, values: $values, options: $options) {
				${ this._generateAttribTree(attributes) }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		return this._execute(r, query, variables);
	}

	destroy = async (options, attributes = [ "id" ]) => {
		const r = (options.limit === 1) ? this._resource : this._resources;
		const query = `
		mutation Delete{ this._pluralName }($options: Json) {
			${ r }(action: DELETE, options: $options) {
				${ this._generateAttribTree(attributes) }
			}
		}
		`;

		const variables = {
			options,
		};

		return this._execute(r, query, variables);
	}

	_generateAttribTree = (attribTree) => {
		return _.transform(attribTree, (r, attrib) => {
			if (!_.isString(attrib)) {
				attrib = `${ attrib[0] } {
						${ this._generateAttribTree(attrib[1]) }
					}`;
			}

			r.push(`
				${ attrib }
			`);
		}, []).join("\n");
	}

	_execute = async (resource, query, variables) => {
		const { data, errors } = await this._requestManager.execute(query, variables);

		if (errors) {
			throw new ApiError(errors);
		}

		return data[resource];
	}
}

export default Api;
