import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import debug from "debug";
import path from "path";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import _ from "lodash";

import * as resolvers from "./resolvers";

const log = debug("therion:server:app");

export default (async (config, globals, modelDefs, controllers) => {
	try {
		log("***Configurations***");
		log(config);
		log("************");

		const dataMgr = await globals.DataManager.initialize(modelDefs, config);
		const models = dataMgr.models;
		const graphqlMgr = globals.GraphQLManager.initialize(models, controllers);

		// Initialize the app
		const app = express();

		log("Instantiate server app");

		const typesArray = fileLoader(path.join(__dirname, "./**/*.graphql"))
			.concat(graphqlMgr.querySchema, graphqlMgr.customTypesSchema);

		const typeDefs = mergeTypes(_.filter(typesArray, (item) => (!Array.isArray(item))),
			{ all: true });
		const resolverDefs = {
			...resolvers,
			Query: graphqlMgr.query,
		};

		log(typeDefs);
		log(resolverDefs);

		const schema = makeExecutableSchema({
			typeDefs,
			resolvers: resolverDefs,
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
