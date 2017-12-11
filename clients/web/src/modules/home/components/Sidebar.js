import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

class Sidebar extends PureComponent {
	render() {
		return (
			<Layout.Sider style={{ background: "#fff" }}>
				<Menu
					mode="inline"
					defaultSelectedKeys={[ "dashboard" ]}
					defaultOpenKeys={[ "configurations" ]}>
					<Menu.Item><Link to="/">Dashboard</Link></Menu.Item>
					<Menu.Item><Link to="/todos">To Dos</Link></Menu.Item>
				</Menu>
			</Layout.Sider>
		);
	}
}

Sidebar.propTypes = {
};

export default Sidebar;
