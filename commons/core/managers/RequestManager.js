class RequestManager {
	constructor(config) {
		this._url = `${config.host}:${config.port}/${config.endpoint}`;
	}

	execute = async (query, variables) => {
		const result = await fetch(this._url, {
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
	};
}

export default RequestManager;
