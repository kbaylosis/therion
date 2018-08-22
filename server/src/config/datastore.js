
const datastore = {
	development: {
		dialect: "sqlite",
		host: "sqlite",
		name: "db.therion.sqlite",
		username: null,
		password: null,
		location: "../..",
	},

	test: {
		dialect: "mysql",
		host: "localhost",
		name: "therion",
		username: "root",
		password: "root",
	},

	production: {
		dialect: process.env.DB_DIALECT || "mysql",
		host: process.env.DB_HOST ||  "localhost",
		name: process.env.DB_NAME || "therion",
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || "root",
	},

	//
	// safe - Do not touch the database
	// alter - Alters tables to fit models
	// drop - Deletes tables before re-creating it
	//
	mode: "alter",

	modelSequence: [
		"User",
		"Employee",
		"Priority",
	],
};

module.exports = datastore;
