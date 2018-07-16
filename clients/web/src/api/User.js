import * as globals from "../globals";

class User {
	getList = async () => {
		console.log("Test");

		const query = `
			query UserList {
				employees {
					rows {
						badgeId
					}
				}
			}`;

		return await globals.DataManager.execute(query);
	}
}

export default new User();
