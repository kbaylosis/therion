import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Avatar, Col, Dropdown, Icon, Layout, Menu, Row } from "antd";

import logo from "__src/assets/logo.svg";

const menu = (
	<Menu>
		<Menu.Item>
			<a target="_blank" rel="noopener noreferrer" href="#">Profile</a>
		</Menu.Item>
		<Menu.Divider/>
		<Menu.Item>
			<Link to="/login">Logout</Link>
		</Menu.Item>
	</Menu>
);

// <a target="_blank" rel="noopener noreferrer" href="/login">Logout</a>

class Header extends PureComponent {
	render() {
		return (
			<Layout.Header id="home-header">
				<Row>
					<Col span={ 3 }>
						<Avatar src={ logo } className="logo"/>
					</Col>
					<Col span={ 21 }>
						<Row type="flex" justify="end">
							<Dropdown overlay={ menu }>
								<a className="ant-dropdown-link" href="#">
										Welcome, Kenneth!<Icon type="down" />
								</a>
							</Dropdown>
						</Row>
					</Col>
				</Row>
			</Layout.Header>
		);
	}
}

export default Header;
