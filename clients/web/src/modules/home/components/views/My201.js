import React, { PureComponent } from "react";
import {
	Card,
	Col,
	Layout,
	Row,
} from "antd";

import profilePic from "../../../../assets/myProfile.png";
import my201File from "../../../../assets/my201File.png";

class Content extends PureComponent {
	render() {
		return (
			<Layout.Content id="dashboard-content" className="content" style={{ overflow: "initial" }}>
				<div>
					<h1>My 201 File</h1>
				</div>
				<Row gutter={16}>
					<img alt="example" src={ profilePic } style={{ width: "100%" }} />
				</Row>
				<Row gutter={16}>
					<img alt="example" src={ my201File } style={{ width: "100%" }} />
				</Row>
			</Layout.Content>
		);
	}
}

Content.propTypes = {
};

export default Content;
