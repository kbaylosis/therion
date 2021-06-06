
const datastore = {
	development: {
		dialect: "postgres", /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
		host: "localhost",
		name: "therion",
		username: "test",
		password: "test",
	},

	test: {
		dialect: "postgres", /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
		host: "localhost",
		name: "therion",
		username: "test",
		password: "test",
	},

	production: {
		dialect: process.env.DB_DIALECT || "postgres", /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
		host: process.env.DB_HOST ||  "localhost",
		name: process.env.DB_NAME || "therion",
		username: process.env.DB_USERNAME || "test",
		password: process.env.DB_PASSWORD || "test",
	},

	//
	// safe - Do not touch the database
	// alter - Alters tables to fit models
	// drop - Deletes tables before re-creating it
	//
	mode: "drop",

	modelSequence: [
		"UserAccount",
	],
};

module.exports = datastore;
