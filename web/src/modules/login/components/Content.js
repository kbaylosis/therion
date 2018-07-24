import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Checkbox,
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
			<Layout.Content id="login-content" className="content">
				<Row type="flex" justify="center">
					<Col span={ 6 }>
						<Form onSubmit={this.handleSubmit} id="login-box" className="login-form">
							<div type="flex" style={{ textAlign: "center", paddingBottom: 10 }}>
								<h2>Welcome to HRIS Pro!</h2>
							</div>
							<FormItem>
								{
									getFieldDecorator("userName", {
										rules: [{ required: true, message: "Please input your username!" }],
									})(
										<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
											placeholder="Username" />
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
								{
									getFieldDecorator("remember", {
										valuePropName: "checked",
										initialValue: false,
									})(
										<Checkbox>Remember me</Checkbox>
									)
								}
								<a className="login-form-forgot" href="">Forgot password</a>
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
