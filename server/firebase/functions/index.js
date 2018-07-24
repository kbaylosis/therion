require("babel-register");
require("json-circular-stringify");

// const requireDirectory = require("require-directory");

const App = require("./../../src/core/app");
// const globals = require("./../../src/globals.js");
// const config = requireDirectory(module, "./../../src/config");
// const models = requireDirectory(module, "./../../src/models");
// const controllers = requireDirectory(module, "./../../src/controllers");

//
// Temporary
// To-do: able to require * using non-ES6 import
//
const files = require("./files");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const debug = require("debug");

admin.initializeApp({ databaseURL: "https://<project_name>.firebaseio.com" });

// for firebase db call ~ admin.firestore();
// for firebase authentication call ~ admin.auth();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const log = debug("therion:server");

// Start the server
log("Start the server");

const app = App(files.config, files.globals, files.models, files.controllers);

exports.api = functions.https.onRequest((req, res) => {
	req.firebase = admin;

	return app(req, res);
});
