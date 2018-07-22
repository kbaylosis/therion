import React, { PureComponent } from "react";
import {
	Layout,
} from "antd";

import "../styles.scss";

import Content from "./Content";

class TodosView extends PureComponent {
	render() {
		return (
			<Layout>
				<Content/>
			</Layout>
		);
	}
}

TodosView.propTypes = {
};

export default TodosView;
