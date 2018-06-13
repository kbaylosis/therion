import React, { PureComponent } from "react";
import { Layout } from "antd";

class Footer extends PureComponent {
	render() {
		return (
			<Layout.Footer className="footer">
				© Copyright 2018 Zoog Technologies, Inc - All rights reserved.
			</Layout.Footer>
		);
	}
}

Footer.propTypes = {
};

export default Footer;
