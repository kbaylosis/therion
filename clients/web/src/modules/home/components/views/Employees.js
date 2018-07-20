import React, { PureComponent } from "react";
import {
	Divider,
	Layout,
	Row,
	Table,
} from "antd";
import moment from "moment";

// import thisView from "../../../../assets/employees.png";
// import * as globals from "__src/globals";

const columns = [{
	title: "Id",
	dataIndex: "id",
	key: "id",
	width: 50,
	render: (text) => <a href="#">{text}</a>,
}, {
	title: "Last Name",
	dataIndex: "lastname",
	key: "lastname",
	width: 100,
}, {
	title: "First Name",
	dataIndex: "firstname",
	key: "firstname",
	width: 100,
}, {
	title: "Department",
	dataIndex: "department",
	key: "department",
	width: 150,
}, {
	title: "Job Title",
	dataIndex: "jobTitle",
	key: "jobTitle",
	width: 100,
}, {
	title: "Date of Hire",
	dataIndex: "dateOfHire",
	key: "dateOfHire",
	width: 80,
	render: (text) => <span>{ moment(new Date(text)).format("MM/DD/YYYY") }</span>,
}, {
	title: "Email",
	dataIndex: "email",
	key: "email",
	width: 150,
}, {
	title: "Badge Id",
	dataIndex: "badgeId",
	key: "badgeId",
	width: 70,
}, {
	title: "Action",
	key: "action",
	width: 100,
	render: (text, record) => (
		<span>
			<a href="#">Edit</a>
			<Divider type="vertical" />
			<a href="#">Delete</a>
		</span>
	),
}];

class Content extends PureComponent {
	render() {
		const { employees } = this.props;

		return (
			<Layout.Content id="dashboard-content" className="content" style={{ overflow: "initial" }}>
				<div>
					<h1>List of Employees</h1>
				</div>
				<Row gutter={ 16 } style={{ padding: 10 }}>
					<Table bordered size="small" columns={ columns } dataSource={ employees.rows } />
				</Row>
			</Layout.Content>
		);
	}
}

Content.propTypes = {
};

export default Content;
