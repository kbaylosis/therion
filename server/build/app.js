"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require("apollo-server-express");

var _graphqlTools = require("graphql-tools");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _Query = require("./controllers/Query.js");

var _Query2 = _interopRequireDefault(_Query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = {};

// The GraphQL schema in string form

resolvers["Query"] = _Query2.default;
var typesArray = (0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, "./models/**/*.graphql"));
var typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)(typesArray, { all: true });

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: resolvers
});

// Initialize the app
var app = (0, _express2.default)();

// The GraphQL endpoint
app.use("/graphql", _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: "/graphql" }));

exports.default = app;