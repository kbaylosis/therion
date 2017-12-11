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

const data1 = () => ({
	labels: ["January", "February", "March", "April", "May", "June", "July", "Aug",
		"Sept", "Oct", "Nov"],
	datasets: [{
		label: "Sales",
		fillColor: "rgba(220,220,220,0.2)",
		strokeColor: "rgba(220,220,220,1)",
		pointColor: "rgba(220,220,220,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: rand(1000, 100000, 11),
	}],
});

const data2 = () => ({
	labels: ["January", "February", "March", "April", "May", "June", "July", "Aug",
		"Sept", "Oct", "Nov"],
	datasets: [{
		label: "Purchases",
		fillColor: "rgba(151,187,205,0.2)",
		strokeColor: "rgba(151,187,205,1)",
		pointColor: "rgba(151,187,205,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(151,187,205,1)",
		data: rand(1000, 100000, 11),
	}],
});

class Content extends PureComponent {
	render() {
		return (
			<Layout.Content>
				<Row type="flex">
					<Col className="bargraph" span={12}>
						<Bar data={data1()} width={250} height={500}
							options={{ maintainAspectRatio: false }}/>
					</Col>
					<Col className="bargraph" span={12}>
						<Bar className="bargraph" data={data2()} width={250} height={500}
							options={{ maintainAspectRatio: false }}/>
					</Col>
				</Row>
			</Layout.Content>
		);
	}
}

Content.propTypes = {
};

export default Content;
