import fs from "fs";
import path from "path";
import debug from "debug";

import app from "./core/app";
import * as config from "./config";
import * as globals from "./globals";
import * as models from "./models";
import * as controllers from "./controllers";

const log = debug("therion:server");

// Start the server
log("Start the server");

app(config, globals, models, controllers).then((a) => {
	a.listen(process.env.DEBUG ? config.Custom.port : (config.Custom.ssl ? 443 : 80), () => {
		if (process.env.DEBUG) {
			log(fs.readFileSync(path.join(__dirname, "../assets/logo")).toString());
			log("✔ Therion server started in debug mode");
			log(`Go to http://localhost:${ config.Custom.port }`);
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
}).catch((e) => {
	log("✗ Error");
	log (e);
});
