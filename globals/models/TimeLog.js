import Sequelize from "../../db";

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
