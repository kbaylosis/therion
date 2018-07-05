import fs from "fs";
import path from "path";
import debug from "debug";

import { port, ssl } from "./config/custom";
import app from "./app";

const log = debug("therion:server");

// Start the server
log("Start the server");

app.listen(process.env.DEBUG ? port : (ssl ? 443 : 80), () => {
	if (process.env.DEBUG) {
		log(fs.readFileSync(path.join(__dirname, "../assets/logo")).toString());
		log("✔ Therion server started in debug mode");
		log(`Go to http://localhost:${ port }`);
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