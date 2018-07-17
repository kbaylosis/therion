import Sequelize from "sequelize";

class Priority {
	static attributes = {
		priorityId: Sequelize.STRING,
		schedule: Sequelize.DATE,
	}

	static associations = {
		to: {
			type: "belongsTo",
			model: "User",
		},
		user: {
			type: "belongsTo",
			model: "User",
		},
	}
}

export default Priority;
