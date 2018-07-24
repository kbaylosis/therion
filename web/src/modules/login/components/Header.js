import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
	Avatar,
	Button,
	Layout,
} from "antd";

import logo from "__src/assets/logo.png";

class Header extends PureComponent {
	render() {
		return (
			<Layout.Header className="header">
				<Avatar src={ logo } className="menu-logo"/>
				<Button id="login-signup">
					<Link to="/registration">Sign Up</Link>
				</Button>
			</Layout.Header>
		);
	}
}

Header.propTypes = {
};

export default Header;
