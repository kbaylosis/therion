import Sequelize from "sequelize";
import _ from "lodash";
import debug from "debug";

const log = debug("therion:server:DataManager");

class DataManager {
	initialize = async (models, config) => {
		try {
			this._definitions = models;
			this._config = config;

			const datastore = this._config.Datastore;

			this._manager = new Sequelize(datastore.name,
				datastore.username, datastore.password, {
					host: datastore.host,
					dialect: datastore.dialect,
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
			log(`Database connection to ${ datastore.host } has been established successfully.`);

			// Instantiate models
			this._models = _.transform(this._definitions, (r, modelDef, name) => {
				r[name] = this.manager.define(_.camelCase(name), modelDef.attributes);
				r[name].description = modelDef.description;
				
				_.forEach(modelDef.hooks, (v, k) => {
					r[name].hook(k, v);
				});
			}, {});

			// Construct relationships
			_.forEach(this._definitions, (modelDef, name) => {
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

		return this;
	}

	get manager() {
		return this._manager;
	}

	get models() {
		return this._models;
	}
}

export default DataManager;
