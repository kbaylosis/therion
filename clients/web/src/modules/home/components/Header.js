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
							<Link to="/my201">201 File</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/myDTR">Daily Time Records</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/myPayslips">Payslips</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/mylogs">Timekeeping Logs</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.Item key="/calendar"><Link to="/calendar">Calendar</Link></Menu.Item>
					<Menu.Item key="/employees"><Link to="/employees">Employees</Link></Menu.Item>
					<Menu.Item key="/approvalRequests">
						<Link to="/approvalRequests">Approval Requests</Link>
					</Menu.Item>
					<Menu.SubMenu title={<span>Forms</span>}>
						<Menu.Item>
							<Link to="/overtime">Overtime</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/undertime">Undertime</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/leave">Leave</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/appraisal">Appraisal</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.SubMenu title={<span>Recruitment</span>}>
						<Menu.Item>
							<Link to="/onBoardingList">On Boarding List</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/resumes">Resume Bank</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/jobs">Job Postings</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.SubMenu title={<span>Appraisal</span>}>
						<Menu.Item>
							<Link to="/skillTaskList">Skills Task List</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/devPlans">Individual Development Plans</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.SubMenu title={<span>Payroll</span>}>
						<Menu.Item>
							<Link to="/payrollRegister">Payroll Register</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/earningsSummary">Earnings Summary</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/payrollDeductionRecap">Payroll Deduction Recap</Link>
						</Menu.Item>
					</Menu.SubMenu>
					<Menu.SubMenu title={<span><Icon type="ellipsis"
						style={{ margin: 0, fontSize: 20 }} /></span>} style={{ float: "right" }}>
						<Menu.Item>
							<Link to="/profile">Profile</Link>
						</Menu.Item>
						<Menu.SubMenu key="/administration" title="Administration">
							<Menu.Item key="/users"><Link to="/users">Users</Link></Menu.Item>
							<Menu.Item key="/teams"><Link to="/teams">Teams</Link></Menu.Item>
							<Menu.Item key="/roles"><Link to="/roles">Roles</Link></Menu.Item>
							<Menu.Item key="/activities"><Link to="/activities">Activities</Link></Menu.Item>
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
