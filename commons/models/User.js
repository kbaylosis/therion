import Sequelize from "../../db";

import * as Enum from "../enums";

class User {
	static description = "System user";
	static attributes = {
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		mobile: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
		},
		firstname: Sequelize.STRING,
		lastname: Sequelize.STRING,
		type: {
			type: Sequelize.ENUM(Enum.BUSINESS, Enum.REGULAR),
			defaultValue: Enum.REGULAR,
			allowNull: false,
			validate: {
				isIn: [[Enum.BUSINESS, Enum.REGULAR]],
			},
		},
	};
}

export default User;
