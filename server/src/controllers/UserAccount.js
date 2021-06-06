import bcrypt from "bcryptjs";

import Controller from "../core/base/Controller";
import security from "../config/security";

class UserAccount extends Controller {
	static hooks = {
		beforeCreate: async (user) => {
			const salt = await bcrypt.genSalt(security.saltRounds);

			user.password = await bcrypt.hash(user.password, salt);
		},
	}
}

export default UserAccount;
