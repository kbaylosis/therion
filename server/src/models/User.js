import Sequelize from "sequelize";
import bcrypt from "bcrypt";

import * as Types from "../types";
import security from "../config/security";

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
			type: Sequelize.ENUM(Types.BUSINESS, Types.REGULAR),
			defaultValue: Types.REGULAR,
			allowNull: false,
			validate: {
				isIn: [[Types.BUSINESS, Types.REGULAR]],
			},
		},
	};

	static associations = {
		priorities: {
			type: "hasMany",
			model: "Priority",
		},
	};

	static hooks = {
		beforeCreate: async (user) => {
			const salt = await bcrypt.genSalt(security.saltRounds);

			user.password = await bcrypt.hash(user.password, salt);
		},
	}
}

export default User;
