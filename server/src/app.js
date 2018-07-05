import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

import * as resolvers from "./controllers";

// The GraphQL schema in string form
const typesArray = fileLoader(path.join(__dirname, "./models/**/*.graphql"));
const typeDefs = mergeTypes(typesArray, { all: true });

console.log(typeDefs);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

export default app;
