import Sequelize from "sequelize";

class User {
	static description = "System user";
	static attributes = {
		firstname: Sequelize.STRING,
		lastname: Sequelize.STRING,
		email: Sequelize.STRING,
		mobile: Sequelize.STRING,
		type: {
			type: Sequelize.ENUM("BUSINESS", "REGULAR"),
			defaultValue: "regular",
			allowNull: false,
		},
	};

	static associations = {
		priorities: {
			type: "hasMany",
			model: "Priority",
		},
	}
}

export default User;
