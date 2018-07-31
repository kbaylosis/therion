import React, { PureComponent } from "react";
import {
	Col,
	Layout,
	Row,
} from "antd";
import { Bar } from "react-chartjs-2";

const rand = (min, max, num) => {
	const rtn = [];

	while (rtn.length < num) {
		rtn.push((Math.random() * (max - min)) + min);
	}

	return rtn;
};

const data = () => ({
	labels: ["January", "February", "March", "April", "May", "June", "July", "Aug",
		"Sept", "Oct", "Nov", "Dec"],
	datasets: [{
		label: "Todos",
		fillColor: "rgba(220,220,220,0.2)",
		strokeColor: "rgba(220,220,220,1)",
		pointColor: "rgba(220,220,220,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: rand(0, 100, 12),
	}],
});

class Content extends PureComponent {
	render() {
		return (
			<Layout.Content id="dashboard-content">
				<Row type="flex">
					<Col className="bargraph" span={12}>
						<Bar data={data()} width={250} height={500}
							options={{ maintainAspectRatio: false }}/>
					</Col>
				</Row>
			</Layout.Content>
		);
	}
}

export default Content;
