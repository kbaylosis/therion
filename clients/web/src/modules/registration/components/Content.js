import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Col,
	Form,
	Icon,
	Input,
	Layout,
	Row,
} from "antd";

const FormItem = Form.Item;

class Content extends PureComponent {
	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Layout.Content id="registration-content" className="content">
				<Row type="flex" justify="center">
					<Col span={ 6 }>
						<Form onSubmit={this.handleSubmit} id="registration-box" className="registration-form">
							<div type="flex" style={{ textAlign: "center", paddingBottom: 10 }}>
								<h2>{ "Let's get started!" }</h2>
							</div>
							<FormItem>
								{
									getFieldDecorator("fullName", {
										rules: [{ required: true, message: "Please input your full name!" }],
									})(
										<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
											placeholder="Full name" />
									)
								}
							</FormItem>
							<FormItem>
								{
									getFieldDecorator("email", {
										rules: [{ required: true, message: "Please input your email!" }],
									})(
										<Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
											placeholder="Email" />
									)
								}
							</FormItem>
							<FormItem>
								{
									getFieldDecorator("password", {
										rules: [{ required: true, message: "Please input your Password!" }],
									})(
										<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
											type="password" placeholder="Password" />
									)
								}
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="login-form-button">
									<Link to="/">Log In</Link>
								</Button>
							</FormItem>
						</Form>
					</Col>
				</Row>
			</Layout.Content>
		);
	}
}

Content.propTypes = {
};

export default Form.create()(Content);
