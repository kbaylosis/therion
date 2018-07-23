import Sequelize from "sequelize";

class Employee {
	static attributes = {
		employeeId: Sequelize.STRING,
		firstname: Sequelize.STRING,
		lastname: Sequelize.STRING,
		department: Sequelize.STRING,
		jobTitle: Sequelize.STRING,
		dateHired: Sequelize.DATE,
		badgeId: Sequelize.STRING,
	}

	static associations = {
		user: {
			type: "belongsTo",
			model: "User",
		},
	}
}

export default Employee;
