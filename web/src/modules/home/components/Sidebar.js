import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import QueueAnim from "rc-queue-anim";

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

	componentDidUpdate(prevProps, prevContext) {
		if (prevContext.router.route.location.pathname !==
			this.context.router.route.location.pathname) {
			this.setState({
				route: this.context.router.route.location.pathname,
			});
		}
	}

	render() {
		return (
			<Layout.Sider style={{ background: "#fff" }}>
				<QueueAnim
					component={ Menu }
					componentProps={{
						mode: "inline",
						defaultSelectedKeys: [ "/" ],
						selectedKeys: [ this.state.route ],
					}}
					delay={ 100 }
					type="left">
					<Menu.Item key="/"><Link to="/">Dashboard</Link></Menu.Item>
					<Menu.Item key="/todos"><Link to="/todos">To Dos</Link></Menu.Item>
				</QueueAnim>
			</Layout.Sider>
		);
	}
}

Sidebar.propTypes = {
};

export default Sidebar;
