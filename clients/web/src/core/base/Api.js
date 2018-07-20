import _ from "lodash";
import pluralize from "pluralize";

import * as globals from "__src/globals";

class Api {
	constructor(name) {
		this._name = name;
		this._pluralName = pluralize(this._name);
		this._resource = _.camelCase(this._name);
		this._resources = pluralize(this._resource);

		console.log(this._name);
		console.log(this._pluralName);
		console.log(this._resource);
		console.log(this._resources);
	}

	get name() {
		return this._name;
	}

	//
	// Singular queries
	//

	findById = async ({ id, options }, attributes = []) => {
		const query = `
		query Find${ this._name }ById($id: Int) {
			${ this._resource }(id: $id) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			id,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resource];
	}

	findOne = async ({ where, options }, attributes = []) => {
		const query = `
		query Find${ this._name }($where: Json, $options: Json) {
			${ this._resource }(where: $where, options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			where,
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resource];
	}

	//
	// Plural queries
	//

	findAndCount = async ({ where, offset, limit, order, options }, attributes = []) => {
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

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resources];
	}

	findAll = async ({ where, offset, limit, order, options }, attributes = []) => {
		const query = `
		query FindAndCount${ this._pluralName }
			($where: Json, $offset: Int, $limit: Int, $order: Json, $options: Json) {
			${ this._resources }(where: $where, offset: $offset,
				limit: $limit, order: $order, options: $options) {
				offset
				limit
				rows {
					${ attributes.join("\n") }
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

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resources];
	}

	//
	// Singular mutations
	//

	create = async ({ values, options }, attributes = []) => {
		const query = `
		mutation Create${ this._name }($values: Json, $options: Json) {
			${ this._resource }(values: $values, options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resource];
	}

	findOrCreate = async ({ values, options }, attributes = []) => {
		const query = `
		mutation FindOrCreate{ this._name }($values: Json, $options: Json) {
			${ this._resource }(values: $values, options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resource];
	}

	upsert = async ({ values, options }, attributes = []) => {
		const query = `
		mutation UpdateOrInsert{ this._name }($values: Json, $options: Json) {
			${ this._resource }(values: $values, options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resource];
	}

	update = async ({ values, options}, attributes = []) => {
		const query = `
		mutation Update{ this._name }($values: Json, $options: Json) {
			${ this._resource }(values: $values, options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resource];
	}

	destroy = async (options, attributes = []) => {
		const query = `
		mutation Delete{ this._name }($options: Json) {
			${ this._resource }(options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resource];
	}

	//
	// Plural mutations
	//

	bulkCreate = async ({ values, options }, attributes = []) => {
		const query = `
		mutation BulkCreate{ this._pluralName }($values: Json, $options: Json) {
			${ this._resources }(values: $values, options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resources];
	}

	update = async ({ values, options}, attributes = []) => {
		const query = `
		mutation Update{ this._pluralName }($values: Json, $options: Json) {
			${ this._resources }(values: $values, options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			values,
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resources];
	}

	destroy = async (options, attributes = []) => {
		const query = `
		mutation Delete{ this._pluralName }($options: Json) {
			${ this._resources }(options: $options) {
				${ attributes.join("\n") }
			}
		}
		`;

		const variables = {
			options,
		};

		const { data } = await globals.DataManager.execute(query, variables);

		return data[this._resources];
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
}

export default Api;
