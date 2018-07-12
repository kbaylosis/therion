import Sequelize from "sequelize";
import _ from "lodash";
import debug from "debug";

import * as config from "../config";
import * as modelDefs from "../models";

const log = debug("therion:server:DataManager");

class DataManager {
	initialize = async () => {
		try {
			this._manager = new Sequelize(config.Datastore.name,
				config.Datastore.username, config.Datastore.password, {
					host: config.Datastore.host,
					dialect: config.Datastore.dialect,
					pool: {
						max: 5,
						min: 0,
						acquire: 30000,
						idle: 10000,
					},

					// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
					operatorsAliases: false,
				});

			await this._manager.authenticate();
			log(`Database connection to ${ config.Datastore.host } has been established successfully.`);

			// Instantiate models
			this._models = _.transform(modelDefs, (r, v, k) => {
				r[k] = this.manager.define(_.camelCase(k), v.attributes);
				r[k].description = v.description;
			}, {});

			// Construct relationships
			_.forEach(modelDefs, (modelDef, name) => {
				if ("associations" in modelDef) {
					_.forEach(modelDef.associations, (association, fieldName) => {
						this._models[name][association.type](this._models[association.model], { as: fieldName });
					}, this);
				}
			});

			_.forEach(this._models, (model) => {
				model.sync({force: false});
			});
		} catch (e) {
			log(e);
			throw e;
		}
	}

	get manager() {
		return this._manager;
	}

	get models() {
		return this._models;
	}
}

export default DataManager;
