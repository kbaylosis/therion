import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
	Col,
	Layout,
	Row,
} from "antd";
import QueueAnim from "rc-queue-anim";

import AddTodo from "../components/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import Footer from "../components/Footer";

class Content extends PureComponent {
	render() {
		return (
			<Layout.Content  id="todos-content">
				<Row type="flex" justify="center">
					<Col span={ 12 }>
						<QueueAnim delay={100} type={"top"}>
							<AddTodo key={1}/>
						</QueueAnim>
						<QueueAnim delay={250} type={"top"}>
							<Footer key={2}/>
						</QueueAnim>
						<QueueAnim delay={250} type={"left"}>
							<VisibleTodoList key={3}/>
						</QueueAnim>
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
