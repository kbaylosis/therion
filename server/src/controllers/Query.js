import casual from "casual";

import * as globals from "../globals";

class Query {
	tickets = (where, offset, limit) => Array.apply(null, {length: limit}).map(Function.call, this.ticket)
	ticket = () => ({
		user: {
			firstname: casual.first_name,
			lastname: casual.last_name,
			email: casual.email,
			mobile: casual.phone,
		},
		refId: `${ casual.color_name }-${ casual.random * 100 }`,
		schedule: new Date(Date.UTC(2017, 0, 10, 21, 33, 15, 233)),
	})
	users = (users, { where, offset, limit }) =>
		globals.DataManager.models["User"].findAll({ where: JSON.parse(where), offset, limit });
	user = (users, { where, offset, limit }) =>
		globals.DataManager.models["User"].find({ where: JSON.parse(where), offset, limit });
}

export default new Query();
