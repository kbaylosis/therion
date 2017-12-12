import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	Button,
	Form,
	Icon,
	Input,
} from "antd";

//
// See https://www.npmjs.com/package/history for the routines
//
// import { push, replace, go, goBack, goForward } from "react-router-redux";
// import { goBack } from "react-router-redux";

import { addTodo } from "../actions";

class AddTodo extends PureComponent {
	render () {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form layout="inline" onSubmit={ this._handleSubmit } className="todo-form">
				<Form.Item>
					{
						getFieldDecorator("todo", {
							rules: [{ required: true, message: "To Do" }],
							onChange: this._handleSelectChange,
						})(
							<Input
								prefix={<Icon type="check-square-o" style={{ fontSize: 13 }} />}
								placeholder="To Do"
							/>
						)
					}
				</Form.Item>
				<Form.Item>
					<Button type="primary" className="login-form-button" onClick={ this._onClick }>
						<Icon type="plus-circle" style={{ fontSize: 13 }} />
					</Button>
				</Form.Item>
			</Form>
		);
	}

	_onClick = (e) => {
		this.props.dispatch(addTodo(this.props.form.getFieldValue("todo")));
		this.props.form.setFieldsValue({
			todo: "",
		});

		// Example only:
		// this.props.dispatch(goBack());
	}
};

export default connect()(Form.create()(AddTodo));
