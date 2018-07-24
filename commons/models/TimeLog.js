import Sequelize from "../../db";

class TimeLogs {
	static attributes = {
		badgeId: Sequelize.STRING,
		type: Sequelize.STRING,
		timestamp: Sequelize.DATE,
	}

	static associations = {
		employee: {
			type: "belongsTo",
			model: "Employee",
		},
	}
}

export default TimeLogs;
