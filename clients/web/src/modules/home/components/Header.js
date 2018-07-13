import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
	Avatar,
	Icon,
	Layout,
	Menu,
} from "antd";

import logo from "__src/assets/logo.png";

class Header extends PureComponent {
	render() {
		return (
			<Layout.Header className="header">
				<Link to="/">
					<Avatar src={ logo } className="menu-logo"/>
				</Link>
				<Menu
					theme="dark"
					mode="horizontal"
					className="navbar-menu">
					<Menu.Item>
						<Link to="/"><Icon type="home" style={{ margin: 0, fontSize: 20 }} /></Link>
					</Menu.Item>
					<Menu.SubMenu title={<span>My Corner</span>}>
						<Menu.Item>
							<Link to="/My201">201 File</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/MyDTRs">Daily Time Records</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/MyPayslips">Payslips</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.Item key="/Calendar"><Link to="/Calendar">Calendar</Link></Menu.Item>
					<Menu.Item key="/Employees"><Link to="/Employees">Employees</Link></Menu.Item>
					<Menu.Item key="/ApprovalRequests">
						<Link to="/ApprovalRequests">Approval Requests</Link>
					</Menu.Item>
					<Menu.SubMenu title={<span>Forms</span>}>
						<Menu.Item>
							<Link to="/OTRequests">Overtime</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/">Undertime</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/">Leave</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/">Appraisal</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.SubMenu title={<span>Recruitment</span>}>
						<Menu.Item>
							<Link to="/">On Boarding List</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/">Resume Bank</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/Jobs">Job Postings</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.SubMenu title={<span>Appraisal</span>}>
						<Menu.Item>
							<Link to="/">Skills Task List</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/">Individual Development Plans</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.SubMenu title={<span>Payroll</span>}>
						<Menu.Item>
							<Link to="/Timekeeping">Timekeeping Logs</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/PayrollRegister">Payroll Register</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/">Earnings Summary</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/">Payroll Deduction Recap</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.SubMenu title={<span><Icon type="ellipsis"
						style={{ margin: 0, fontSize: 20 }} /></span>} style={{ float: "right" }}>
						<Menu.Item>
							<Link to="/">Profile</Link>
						</Menu.Item>
						<Menu.SubMenu key="/administration" title="Administration">
							<Menu.Item key="/users"><Link to="/">Users</Link></Menu.Item>
							<Menu.Item key="/teams"><Link to="/">Teams</Link></Menu.Item>
							<Menu.Item key="/roles"><Link to="/">Roles</Link></Menu.Item>
							<Menu.Item key="/activities"><Link to="/">Activities</Link></Menu.Item>
						</Menu.SubMenu>
						<Menu.Divider/>
						<Menu.Item>
							<Link to="/login">Logout</Link>
						</Menu.Item>
					</Menu.SubMenu>
				</Menu>
			</Layout.Header>
		);
	}
}

Header.propTypes = {
};

export default Header;
