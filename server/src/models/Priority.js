import Sequelize from "sequelize";

class Priority {
	static attributes = {
		priorityNum: {
			type: Sequelize.STRING,
			unique: true,
		},
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
