import fs from "fs";
import path from "path";
import debug from "debug";
import "json-circular-stringify";

import * as models from "./commons/models";

import App from "./core/app";
import * as config from "./config";
import * as globals from "./globals";
import * as controllers from "./controllers";

const log = debug("therion:server");

// Start the server
log("Start the server");

try {
	const app = App(config, globals, models, controllers);

	app.listen(process.env.DEBUG ? config.Custom.port : (config.Custom.ssl ? 443 : 80), () => {
		if (process.env.DEBUG) {
			log(fs.readFileSync(path.join(__dirname, "./commons/assets/logo")).toString());
			log("✔ Therion server started in debug mode");
			log(`
************************************************
* Send requests to http${ config.Custom.ssl ? "s" : "" }://localhost:${ config.Custom.port }/${ config.Custom.endpoint }
************************************************
`);
		} else {
			// eslint-disable-next-line no-console
			console.log(
				`
	************************************************
	* Therion server started in production mode
	************************************************
	`);
		}
	});
} catch (e) {
	log("✗ Error");
	log (e);
}
