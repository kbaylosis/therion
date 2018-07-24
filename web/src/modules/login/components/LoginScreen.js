import React, { PureComponent } from "react";
import { Layout } from "antd";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import "../styles.scss";

class LoginScreen extends PureComponent {
	render() {
		return (
			<Layout className="module-container">
				<Header/>
				<Content/>
				<Footer/>
			</Layout>
		);
	}
}

LoginScreen.propTypes = {
};

export default LoginScreen;
