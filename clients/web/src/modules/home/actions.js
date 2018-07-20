import * as Types from "./types";

import * as globals from "__src/globals";

export const listEmployees = () => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.LIST_EMPLOYEES_ONGOING });
			console.log("**listEmployees**");

			const list = await globals.ApiFactory.Employee.findAndCount({ }, [
				"id",
				"firstname",
				"lastname",
				"department",
				"jobTitle",
				"dateOfHire",
				"email",
				"badgeId",
			]);

			console.log(list);
			console.log("------");

			dispatch({ type: Types.LIST_EMPLOYEES_DONE, list });
		} catch (e) {
			dispatch({ type: Types.LIST_EMPLOYEES_ERROR });
		}
	}
);

export const listTimeLogs = () => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.LIST_TIMELOGS_ONGOING });
			console.log("**listTimeLogs**");

			const list = await globals.ApiFactory.TimeLog.findAndCount({
				order: [["timestamp", "DESC"]],
			}, [
				"id",
				"badgeId",
				"type",
				"timestamp",
				[
					"employee", [
						"firstname",
						"lastname",
						"department",
					],
				],
			]);

			console.log(list);
			console.log("------");

			dispatch({ type: Types.LIST_TIMELOGS_DONE, list });
		} catch (e) {
			dispatch({ type: Types.LIST_TIMELOGS_ERROR });
		}
	}
);
