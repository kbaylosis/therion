import fs from "fs";
import path from "path";

import app from "./app";

// Start the server
app.listen(3000, () => {
	console.log(fs.readFileSync(path.join(__dirname, "../assets/logo")).toString());
	console.log("Go to http://localhost:3000/graphiql to run queries!");
});
