import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import debug from "debug";
import path from "path";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import _ from "lodash";

import * as builtInResolvers from "./resolvers";

const log = debug("therion:server:app");

export default (async (config, globals, modelDefs, controllers) => {
	try {
		log("Configurations:*********");
		log(config);
		log("************************");

		log("✔ Configurations in good shape");

		// Initialize the database and it's models
		const dataMgr = await globals.DataManager.initialize(modelDefs, config);
		const models = dataMgr.models;

		log("✔ Database models initialized");

		const graphqlMgr = globals.GraphQLManager.initialize(models, controllers);

		// Load all hard coded schema definitions from the core and from the app
		const typesArray = fileLoader(path.join(__dirname, "../**/*.graphql"))
		// Generate schema definitions out from the database models
			.concat(graphqlMgr.querySchema, graphqlMgr.mutationSchema, graphqlMgr.customTypesSchema);
		const typeDefs = mergeTypes(_.filter(typesArray, (item) => (!Array.isArray(item))),
			{ all: true });

		// Setup all resolvers
		const resolvers = {
			...builtInResolvers,
			Query: graphqlMgr.query,
			Mutation: graphqlMgr.mutation,
		};

		log("Type Definitions:*******");
		log(typeDefs);
		log("************************");
		log("Resolvers:**************");
		log(resolvers);
		log("************************");

		// Generate the final schema
		const schema = makeExecutableSchema({ typeDefs, resolvers });

		log("✔ GraphQL schemas and resolvers created");

		// Initialize the app
		const app = express();

		// Initialize middlewares
		app.use(compression());
		app.use(cors());

		// app.use(function(req, res, next) {
		// 	res.header("Access-Control-Allow-Origin", "*");
		// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// 	next();
		// });

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

		log("✔ Server app instantiated");

		return app;
	} catch (e) {
		throw e;
	}
});
