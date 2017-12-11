import React from "react";
import {
	Col,
	Layout,
	Row,
	Spin,
} from "antd";

import "./styles.scss";

const Loading = () => (
	<Layout className="centerbox">
		<Row type="flex" justify="center" align="middle" className="centerbox">
			<Col>
				<Spin/>
			</Col>
		</Row>
	</Layout>
);

export default Loading;
