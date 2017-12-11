import { createSelector } from "reselect";

import * as Constants from "./constants";

const getTodos = ({ todos }) => todos;
const getVisibiltyFilter = ({ visibilityFilter }) => visibilityFilter;

export const getVisibleTodos = createSelector(
	[ getTodos, getVisibiltyFilter ],
	(todos, filter) => {
		switch (filter) {
		case Constants.SHOW_ALL:
			return todos;
		case Constants.SHOW_COMPLETED:
			return todos.filter((t) => t.completed);
		case Constants.SHOW_ACTIVE:
			return todos.filter((t) => !t.completed);
		default:
			return todos;
		}
	});
