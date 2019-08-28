import debug from "debug";

const log = debug("gomigupay:server:authMiddleware");


const auth = async (req, res, next) => {
	try {
		const body = req.body || {};
		const allowedOperations = [
			"CreateUser",
			"CreateSession",
		];
		const allowedRoutes = [
			"graphql",
		];

		if (allowedOperations.indexOf(body.operationName) !== -1 ||
		allowedRoutes.indexOf(req.path)) {
			next();

			return;
		}

		let token = req.headers.Authorization || req.headers.authorization || "";

		token = token.split(" ")[1];

		if (!token) {
			res.status(401).send("Not authorized");

			return;
		}

		// check session token here

		log("User authenticated");

		next();
	} catch (e) {
		log(e);
		res.status(500).send("Server error");
	}
};

export default auth;
