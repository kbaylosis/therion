import React, { PureComponent } from "react";
import {
	Layout,
	Row,
} from "antd";

import thisView from "../../../../assets/employees.png";
import * as globals from "__src/globals";

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
							console.log(globals.ApiFactory.api);
							globals.ApiFactory.api.User.create({
								values: {
									username: "mbaylosis",
									email: "mbaylosis@zoogtech.com",
									mobile: "+639177770000",
									password: "success!",
									firstname: "Maria Nay",
									lastname: "Baylosis",
								},
							}, [ "id", "firstname", "lastname" ]).then((result) => {
								console.log("***");
								console.log(result);
							}).catch((e) => {
								console.log(e);
								console.log(e.errors);
							});

							globals.ApiFactory.api.User.findOne({
								where: {
									id: 1,
								},
							}, [ "id", "firstname", "lastname" ]).then((result) => {
								console.log("***");
								console.log(result);
							}).catch((e) => {
								console.log(e);
							});

							globals.ApiFactory.api.User.findById({
								id: 13,
							}, [ "id", "firstname", "lastname" ]).then((result) => {
								console.log("***");
								console.log(result);
							}).catch((e) => {
								console.log(e);
							});

							globals.ApiFactory.api.User.findAndCount({
								where: {
									id: 13,
								},
							}, [ "id", "firstname", "lastname" ]).then((result) => {
								console.log("***");
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
