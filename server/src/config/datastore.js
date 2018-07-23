
const datastore = {
	development: {
		dialect: "sqlite",
		storage: "./db.therion.sqlite",
		name: "therion",
		username: null,
		password: null,
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
};

module.exports = datastore;
