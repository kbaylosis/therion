import React, { PureComponent } from "react";
import { Layout } from "antd";

import Content from "./Content";
import "../styles.scss";

class DashboardView extends PureComponent {
	render() {
		return (
			<Layout>
				<Content/>
			</Layout>
		);
	}
}

DashboardView.propTypes = {
};

export default DashboardView;
