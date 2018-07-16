import Sequelize from "sequelize";

class TimeLogs {
	static attributes = {
		badgeId: Sequelize.STRING,
	}

	static associations = {
		employee: {
			type: "belongsTo",
			model: "Employee",
		},
		user: {
			type: "belongsTo",
			model: "User",
		},
	}
}

export default TimeLogs;
