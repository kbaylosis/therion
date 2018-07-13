import Controller from "../core/base/Controller";

class User extends Controller {
	findOne = (args) => this._model.findOne(args);
}

export default User;
