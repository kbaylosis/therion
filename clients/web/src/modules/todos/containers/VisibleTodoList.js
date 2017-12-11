import { connect } from "react-redux";

import { toggleTodo } from "../actions";
import TodoList from "../components/TodoList";

import { getVisibleTodos } from "../selectors";

const mapStateToProps = ({ todos }) => ({
	todos: getVisibleTodos(todos),
});

const mapDispatchToProps = (dispatch) => ({
	onTodoClick: (id) => {
		dispatch(toggleTodo(id));
	},
});

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
