import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
	Table,
} from "antd";

import Todo from "./Todo";

import QueueAnim from "rc-queue-anim";

class TodoList extends PureComponent {
	constructor(props) {
		super(props);

		const { onTodoClick } = props;

		this.state = {
			columns: [
				{
					title: "Queue No.",
					dataIndex: "id",
					key: "id",
					render: (text, record) => (
						<QueueAnim delay={[250, 0]} type={["top", "bottom"]} duration={[300, 300]}>
							<li key={record.id}>{text + 1}</li>
						</QueueAnim>
					),
					width: "33%",
				},
				{
					title: "Item",
					dataIndex: "text",
					key: "text",
					render: (text, record, index) => (
						<QueueAnim delay={[300, 0]} type={["top", "bottom"]} duration={[300, 300]}>
							<Todo
								key={ record.id }
								{...record}
								onClick={() => onTodoClick(record.id)}
							/>
						</QueueAnim>
					),
					width: "33%",
				},
				{
					title: "Status",
					dataIndex: "completed",
					key: "completed",
					render: (text, record) => {
						if (text === true) {
							return (
								<QueueAnim delay={[350, 0]} type={["top", "bottom"]} duration={[300, 150]}>
									<li key={record.id}>Completed</li>
								</QueueAnim>
							);
						} else if (text === false) {
							return (
								<QueueAnim delay={[350, 0]} type={["top", "bottom"]} duration={[300, 150]}>
									<li key={record.id}>Active</li>
								</QueueAnim>
							);
						}
					},
					width: "33%",
				},
			],
		};
	}

	render() {
		console.log("props", this.props, "state", this.state);
		const { todos } = this.props;
		const { columns } = this.state;
		const pageSize = 10;

		return (
			<Table
				dataSource={ todos }
				columns={ columns }
				pagination={todos.length > pageSize && { pageSize }}
			/>
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
