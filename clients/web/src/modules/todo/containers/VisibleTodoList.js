import { connect } from "react-redux";

import { toggleTodo } from "../actions";
import TodoList from "../components/TodoList";

import { getVisibleTodos } from "../selectors";

const mapStateToProps = ({ Todo }) => ({
	todos: getVisibleTodos(Todo),
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
