import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import debug from "debug";
import path from "path";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import { attributeFields } from "graphql-sequelize";
import _ from "lodash";

import DataManager from "./managers/DataManager";
import * as globals from "./globals";
import * as resolvers from "./types/resolvers";
import * as controllers from "./controllers";
import * as config from "./config";

const log = debug("therion:server:app");

log("***CONFIG***");
log(config);
log("************");

export default (async () => {
	try {
		// Initialize the app
		const app = express();

		log("Instantiate server app");

		globals.DataManager = new DataManager();
		await globals.DataManager.initialize();

		// The GraphQL schema in string form
		let typesArray = fileLoader(path.join(__dirname, "./types/**/*.graphql"));
		const customQl = _.transform(globals.DataManager.models, (gType, model, name) => {
			const attributes = _.transform(attributeFields(model), (r, v, k) => {
				r.push(`${ k }: ${ v.type }`);
			}, []).join("\n");

			gType.push(`
type ${ name } {
	${ attributes }
}`, []);
		}, []);

		typesArray = typesArray.concat(customQl);
		typesArray = typesArray.concat([
			`
	type Query {
		tickets(where: Json, offset: Int, limit: Int, sort: String): [ Ticket ]
		ticket(where: Json, offset: Int, limit: Int, sort: String): Ticket
		users(where: Json, offset: Int, limit: Int, sort: String): [ User ]
		user(where: Json, offset: Int, limit: Int, sort: String): User
	}`,
			`
	type Mutation {
		tickets(action: Action, where: String): [ Ticket ]
		ticket(action: Action, where: String): Ticket
		users(action: Action, where: String): [ User ]
		user(action: Action, where: String): User
	}`,
		]);
		typesArray = _.filter(typesArray, (item) => (!Array.isArray(item)));

		const typeDefs = mergeTypes(typesArray, { all: true });

		log(typeDefs);
		const schema = makeExecutableSchema({
			typeDefs,
			resolvers: {
				...resolvers,
				...controllers,
			},
		});

		// Initialize middlewares
		app.use(compression());

		// The GraphQL endpoint
		app.use(`${ config.Custom.urlPrefix }/graphql`, bodyParser.json(), graphqlExpress({ schema }));

		// GraphiQL, a visual editor for queries
		app.use(`${ config.Custom.urlPrefix }/graphiql`,
			graphiqlExpress({ endpointURL: `${ config.Custom.urlPrefix }/graphql` }));

		// Global error handler
		// eslint-disable-next-line no-unused-vars
		app.use(function (err, req, res, next) {
			log(err);

			res.send(404);
		});

		log("✔ Done!");

		return app;
	} catch (e) {
		throw e;
	}
});
