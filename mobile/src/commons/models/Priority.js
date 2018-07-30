import Sequelize from "../../db";

import * as Enums from "../enums";

class Priority {
	static attributes = {
		priorityNum: {
			type: Sequelize.STRING,
			unique: true,
		},
		schedule: Sequelize.DATE,
		notes: Sequelize.STRING,
		status: {
			type: Sequelize.ENUM(
				Enums.PENDING,
				Enums.ACCEPTED,
				Enums.SERVED,
				Enums.REJECTED,
				Enums.CANCELLED,
			),
			defaultValue: Enums.PENDING,
			allowNull: false,
			validate: {
				isIn: [[
					Enums.PENDING,
					Enums.ACCEPTED,
					Enums.SERVED,
					Enums.REJECTED,
					Enums.CANCELLED,
				]],
			},
		},
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
