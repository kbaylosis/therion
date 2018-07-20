import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import debug from "debug";
import path from "path";
import graphqlExpress from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import _ from "lodash";

import * as builtInResolvers from "./resolvers";

const log = debug("therion:server:app");
const isDebug = (process.env.NODE_ENV !== "production");

export default (async (config, globals, modelDefs, controllers) => {
	try {
		log("Configurations:*********");
		log(config);
		log("************************");

		log("✔ Configurations in good shape");

		// Initialize the database and it's models
		const dataMgr = await globals.DataManager.initialize(modelDefs, controllers, config);
		const models = dataMgr.models;

		log("✔ Database models initialized");

		const graphqlMgr = globals.GraphQLManager.initialize(models, controllers, modelDefs);

		// Load all hard coded schema definitions from the core and from the app
		const typesArray = fileLoader(path.join(__dirname, "../**/*.graphql"))
		// Generate schema definitions out from the database models
			.concat(graphqlMgr.schemas);
		const typeDefs = mergeTypes(_.filter(typesArray, (item) => (!Array.isArray(item))),
			{ all: true });

		// Setup all resolvers
		const resolvers = {
			...builtInResolvers,
			...graphqlMgr.resolvers,
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

		// The GraphQL endpoint
		app.use(`${ config.Custom.urlPrefix }/graphql`,
			bodyParser.json(),
			graphqlExpress({
				schema,
				pretty: isDebug,
				graphiql: true,
				formatError: (e) => ({
					code: e.message.code,
					name: e.message.name,
					message: e.message.message,
					locations: e.locations,
					path: e.path,
					stack: e.stack ? e.stack.split("\n") : [],
				}),
			}),
		);

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
