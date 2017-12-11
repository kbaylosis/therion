import React, { PureComponent } from "react";
import {
	Layout,
} from "antd";

class Header extends PureComponent {
	render() {
		return (
			<Layout.Header id="dashboard-header">
			</Layout.Header>
		);
	}
}

Header.propTypes = {
};

export default Header;
