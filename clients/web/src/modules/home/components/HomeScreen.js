import React, { PureComponent } from "react";
import { Layout } from "antd";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import "../styles.scss";

class HomeScreen extends PureComponent {
	render() {
		return (
			<Layout className="module-container">
				<Header/>
				<Layout>
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
