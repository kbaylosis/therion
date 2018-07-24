import * as custom from "__src/config/custom";

class RequestManager {
	execute = async (query, variables) => {
		const result = await fetch(`${ custom.host }:${ custom.port }/${ custom.endpoint }`, {
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

		return await result.json();
	}
}

export default RequestManager;
