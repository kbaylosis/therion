import React, { PureComponent } from "react";
import { Layout } from "antd";
import {version} from "__src/../package.json";

class Footer extends PureComponent {
	render() {
		return (
			<Layout.Footer id="home-footer">
				Copyright © 2017 Zoog Technologies, Inc {version}
			</Layout.Footer>
		);
	}
}

export default Footer;
