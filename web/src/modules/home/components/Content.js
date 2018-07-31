import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";

import NestedRoute from "__src/components/NestedRoute";

class Content extends PureComponent {
	static propTypes = {
		views: PropTypes.object,
	};

	render() {
		const { routes } = this.props;

		return (
			<Layout.Content id="home-content">
				{
					routes.map((route, index) => (<NestedRoute key={ index } { ...route } />))
				}
			</Layout.Content>
		);
	}
}

export default Content;
