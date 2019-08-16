import _ from "lodash";

class QueryUtils {
	fn = (fn, args) => ({
		fn,
		args,
	});

	where = (attribute, comparator, logic) => {
		if (logic === undefined) {
			logic = comparator;
			comparator = "=";
		}

		return {
			attribute,
			comparator,
			logic,
		};
	};

	col = (...col) =>
		_.transform(
			col,
			(r, v) => {
				r.push({
					col: v,
				});
			},
			[],
		);
}

export default QueryUtils;
