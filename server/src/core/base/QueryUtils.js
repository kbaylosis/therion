import sequelize from "sequelize";
import _ from "lodash";
import debug from "debug";

const log = debug("therion:server:QueryUtils");

class QueryUtils {
	constructor() {
		log("QueryUtils created!");
	}

	where = (w) => this._traverse(_.isString(w) ? JSON.parse(w) : w);

	_traverse = (item) => {
		if (this._isWhere(item)) {
			return sequelize.where(this._traverse(item.attribute), item.comparator, this._traverse(item.logic));
		} else if (this._isFn(item)) {
			const args = _.transform(item.args, (r, v) => {
				r.push(this._traverse(v));
			}, []);

			return sequelize.fn(item.fn, ...args);
		} else if (this._isCol(item)) {
			return sequelize.col(item.col);
		} else if (_.isArray(item)) {
			return _.transform(item, (r, v) => {
				r.push(this._traverse(v));
			}, []);
		} else if (this._isOp(item)) {
			return sequelize.Op[item.replace("$", "")];
		} else if (_.isObject(item)) {
			return _.transform(item, (r, v, k) => {
				r[this._traverse(k)] = this._traverse(v);
			}, {});
		} else {
			return item;
		}
	}

	_isWhere = (item) =>
		_.has(item, "attribute") &&
		_.has(item, "comparator") &&
		_.has(item, "logic");

	_isFn = (item) =>
		_.has(item, "fn") &&
		_.has(item, "args");

	_isCol = (item) =>
		_.has(item, "col");

	_isOp = (item) => _.isFunction(item.startsWith) && item.startsWith("$");
}

export default QueryUtils;
