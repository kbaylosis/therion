import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";

import NestedRoute from "__src/components/NestedRoute";

class Content extends PureComponent {
	render() {
		const { routes } = this.props;

		return (
			<Layout.Content>
				{
					routes.map((route, index) => (<NestedRoute key={ index } { ...route } />))
				}
			</Layout.Content>
		);
	}
}

Content.propTypes = {
	views: PropTypes.object,
};

export default Content;
