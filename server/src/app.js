import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import debug from "debug";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

import * as resolvers from "./controllers";

const log = debug("therion:server:app");

// The GraphQL schema in string form
const typesArray = fileLoader(path.join(__dirname, "./models/**/*.graphql"));
const typeDefs = mergeTypes(typesArray, { all: true });

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

// Initialize the app
const app = express();

log("Instantiate server app");

// Initialize middlewares
app.use(compression());

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Global error handler
// eslint-disable-next-line no-unused-vars 
app.use(function (err, req, res, next) {
	log("test here");
	log(err);
	
	res.send(404);
});

log("✔ Done!");

export default app;
