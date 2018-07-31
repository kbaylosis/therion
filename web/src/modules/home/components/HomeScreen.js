import React, { PureComponent } from "react";
import { Layout } from "antd";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Footer from "./Footer";
import "../styles.scss";

class HomeScreen extends PureComponent {
	render() {
		return (
			<Layout id="home-container">
				<Header/>
				<Layout>
					<Sidebar/>
					<Content { ...this.props }/>
				</Layout>
				<Footer/>
			</Layout>
		);
	}
}

export default HomeScreen;
