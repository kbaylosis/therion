import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
	Table,
} from "antd";

import Todo from "./Todo";

class TodoList extends PureComponent {
	constructor(props) {
		super(props);

		const { onTodoClick } = props;

		this.state = {
			columns: [{
				title: "Item",
				dataIndex: "text",
				key: "text",
				render: (text, record, index) => (
					<Todo
						key={ record.id }
						{...record}
						onClick={() => onTodoClick(record.id)}
					/>
				),
			}],
		};
	}

	render() {
		const { todos } = this.props;
		const { columns } = this.state;

		return (
			<Table dataSource={ todos } columns={ columns } />
		);
	}
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		completed: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired,
	})),
	onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
