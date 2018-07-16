import ApolloClient from "apollo-boost";

import * as custom from "../config/custom";

class DataManager {
	constructor() {
		this._client = new ApolloClient({
			uri: custom.host,
		});
	}

	execute = async (query) => {
		const result = await fetch(custom.host, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ query }),
		});

		return await result.json();
	}

	// execute = async (query) => {
	// 	const q = gql`${query}`;
	// 	// const q = parse(query);
	//
	// 	return await this._client.query({ query: q });
	// }
}

export default DataManager;
