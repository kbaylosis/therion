import React, { PureComponent } from "react";
import {
	Card,
	Col,
	Layout,
	Row,
} from "antd";

import card1 from "../../../assets/news-article1.jpg";
import card2 from "../../../assets/news-article2.jpg";
import card3 from "../../../assets/news-article3.jpg";

class Content extends PureComponent {
	render() {
		return (
			<Layout.Content id="dashboard-content" className="content" style={{ overflow: "initial" }}>
				<div>
					<h1>Corporate News & Announcements</h1>
				</div>
				<Row gutter={16}>
					<Col span={8}>
						<Card hoverable
							cover={<img alt="example" src={ card1 } />}>
							<Card.Meta
								title="Incididunt ut Labore"
								description={ `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
								sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi` }
							/>
						</Card>
					</Col>
					<Col span={8}>
						<Card hoverable
							cover={<img alt="example" src={ card2 } />}>
							<Card.Meta
								title="Sed Do Eiusmod"
								description={ `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
								sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi` }
							/>
						</Card>
					</Col>
					<Col span={8}>
						<Card hoverable
							cover={<img alt="example" src={ card3 } />}>
							<Card.Meta
								title="Ut Enim ad Minim"
								description={ `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
								sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi` }
							/>
						</Card>
					</Col>
				</Row>
			</Layout.Content>
		);
	}
}

Content.propTypes = {
};

export default Content;
