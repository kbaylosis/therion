import fs from "fs";
import path from "path";
import debug from "debug";

import custom from "./config/custom";
import app from "./app";

const log = debug("therion:server");

// Start the server
log("Start the server");

app().then((a) => {
	a.listen(process.env.DEBUG ? custom.port : (custom.ssl ? 443 : 80), () => {
		if (process.env.DEBUG) {
			log(fs.readFileSync(path.join(__dirname, "../assets/logo")).toString());
			log("✔ Therion server started in debug mode");
			log(`Go to http://localhost:${ custom.port }`);
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
