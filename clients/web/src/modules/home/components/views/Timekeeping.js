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
	title: "Badge Id",
	dataIndex: "badgeId",
	key: "badgeId",
	width: 50,
	render: (text) => <a href="#">{text}</a>,
}, {
	title: "Type",
	dataIndex: "type",
	key: "type",
	width: 80,
}, {
	title: "Timestamp",
	dataIndex: "timestamp",
	key: "timestamp",
	width: 80,
	render: (text) => {
		text = text.replace("GMT+0800 (+08)", "GMT-0800 (-08)");
		console.log(text);

		return <span>{ moment(new Date(text)).format("MM/DD/YYYY HH:mm:ss") }</span>;
	},
}, {
	title: "Last Name",
	dataIndex: "employee.lastname",
	key: "employee.lastname",
	width: 100,
}, {
	title: "First Name",
	dataIndex: "employee.firstname",
	key: "employee.firstname",
	width: 100,
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
		const { timelogs } = this.props;

		return (
			<Layout.Content id="dashboard-content" className="content" style={{ overflow: "initial" }}>
				<div>
					<h1>Timekeeping Logs</h1>
				</div>
				<Row gutter={ 16 } style={{ padding: 10 }}>
					<Table bordered size="small" columns={ columns } dataSource={ timelogs.rows } />
				</Row>
			</Layout.Content>
		);
	}
}

Content.propTypes = {
};

export default Content;
