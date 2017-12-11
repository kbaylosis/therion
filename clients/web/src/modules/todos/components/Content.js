import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
	Col,
	Layout,
	Row,
} from "antd";

import AddTodo from "../components/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import Footer from "../components/Footer";

class Content extends PureComponent {
	render() {
		return (
			<Layout.Content  id="todos-content">
				<Row type="flex" justify="center">
					<Col span={ 6 }>
						<AddTodo />
						<VisibleTodoList />
						<Footer/>
					</Col>
				</Row>
			</Layout.Content>
		);
	}
}

Content.propTypes = {
	views: PropTypes.object,
};

export default Content;
