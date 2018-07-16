import React, { PureComponent } from "react";
import {
	Layout,
	Row,
} from "antd";

import User from "__src/api/User";
import thisView from "../../../../assets/employees.png";

class Content extends PureComponent {
	render() {
		return (
			<Layout.Content id="dashboard-content" className="content" style={{ overflow: "initial" }}>
				<div>
					<h1>List of Employees</h1>
				</div>
				<div>
					{
						(() => {
							User.getList().then((result) => {
								console.log(result);
							}).catch((e) => {
								console.log(e);
							});

							return null;
						})()
					}
				</div>
				<Row gutter={16}>
					<img alt="example" src={ thisView } style={{ width: "100%" }} />
				</Row>
			</Layout.Content>
		);
	}
}

Content.propTypes = {
};

export default Content;
