import Sequelize from "../../db";

class Employee {
	static attributes = {
		firstname: Sequelize.STRING,
		lastname: Sequelize.STRING,
		department: Sequelize.STRING,
		jobTitle: Sequelize.STRING,
		dateOfHire: Sequelize.DATE,
		email: Sequelize.STRING,
		badgeId: Sequelize.STRING,
	};
}

export default Employee;
