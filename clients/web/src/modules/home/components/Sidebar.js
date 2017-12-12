import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

class Sidebar extends PureComponent {
	static contextTypes = {
		router: PropTypes.object,
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			route: this.context.router.route.location.pathname,
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextContext.router.route.location.pathname !==
			this.context.router.route.location.pathname) {
			this.setState({
				route: nextContext.router.route.location.pathname,
			});
		}
	}

	render() {
		return (
			<Layout.Sider style={{ background: "#fff" }}>
				<Menu
					mode="inline"
					defaultSelectedKeys={[ "/" ]}
					selectedKeys={[ this.state.route ]}>
					<Menu.Item key="/"><Link to="/">Dashboard</Link></Menu.Item>
					<Menu.Item key="/todos"><Link to="/todos">To Dos</Link></Menu.Item>
				</Menu>
			</Layout.Sider>
		);
	}
}

Sidebar.propTypes = {
};

export default Sidebar;
