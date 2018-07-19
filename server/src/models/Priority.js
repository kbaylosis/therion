import Sequelize from "sequelize";

import * as Types from "../types";

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
				Types.PENDING,
				Types.ACCEPTED,
				Types.SERVED,
				Types.REJECTED,
				Types.CANCELLED,
			),
			defaultValue: Types.PENDING,
			allowNull: false,
			validate: {
				isIn: [[
					Types.PENDING,
					Types.ACCEPTED,
					Types.SERVED,
					Types.REJECTED,
					Types.CANCELLED,
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
