import Sequelize from "../../db";

import * as Enums from "../enums";

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
			type: Sequelize.ENUM(Enums.BUSINESS, Enums.REGULAR),
			defaultValue: Enums.REGULAR,
			allowNull: false,
			validate: {
				isIn: [[Enums.BUSINESS, Enums.REGULAR]],
			},
		},
	};
}

export default User;
