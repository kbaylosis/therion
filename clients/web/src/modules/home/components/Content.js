import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import loadable from "react-loadable";

// import NestedRoute from "__src/components/NestedRoute";
import Loading from "__src/components/Loading";

import DashboardView from "./views/Dashboard";

class Content extends PureComponent {
	render() {
		const { location: { pathname } } = this.props;

		console.log(pathname);

		return (
			<Layout.Content id="home-content" className="content"
				style={{ paddingTop: 20, paddingRight: 50, paddingLeft: 50, overflow: "initial" }}>
				{ this._renderView(pathname) }
			</Layout.Content>
		);
	}

	_renderView = (pathname) => {
		switch (pathname) {
		case "":
		case "/":
			return <DashboardView />;
		default: {

			const ThisView = loadable({
				loader: () => import(`./views${ pathname }`),
				loading: () => (<Loading/>),
			});

			return <ThisView />;
		}
		}
	}
}

Content.propTypes = {
	views: PropTypes.object,
};

export default Content;

// {
// 	// routes.map((route, index) => (<NestedRoute key={ index } { ...route } />))
// }
