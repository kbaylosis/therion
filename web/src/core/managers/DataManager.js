import * as custom from "__src/config/custom";
import ApiError from "../base/ApiError";

class DataManager {
	execute = async (query, variables) => {
		console.log(custom.host);
		console.log(query);
		console.log(variables);
		let result = await fetch(custom.host, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});

		result = await result.json();
		if (result.errors) {
			throw new ApiError("Error/s in request", result.errors);
		}

		return result;
	}
}

export default DataManager;
