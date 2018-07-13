import Sequelize from "sequelize";

// import User from "./User";

class Ticket {
	static attributes = {
		refId: Sequelize.STRING,
		schedule: Sequelize.DATE,
	}

	static associations = {
		user: {
			type: "belongsTo",
			model: "User",
		},
	}
}

export default Ticket;
