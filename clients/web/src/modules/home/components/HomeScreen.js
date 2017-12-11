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
			<Layout>
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

HomeScreen.propTypes = {
};

export default HomeScreen;
