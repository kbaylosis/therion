import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Button, Spinner } from "native-base";

import * as AppConstants from "__src/app/constants";

import styles from "../styles.css.js";

class LoginScreen extends Component {
	static navigationOptions = {
		header: null,
	}

	componentWillReceiveProps({ isLoggedIn, navigation }) {
		if (isLoggedIn) {
			navigation.navigate(AppConstants.HOME_SCREEN);
		}
	}

	render() {
		const { actions, isLoggingIn } = this.props;


		return (
			<View style={styles.container}>
				<Text>Login Screen</Text>
				{
					isLoggingIn ?
					<Spinner color="blue"/>					:
					<Button primary full onPress={actions.loginInProgress}><Text>Log In</Text></Button>
				}
			</View>
		);
	}
}

LoginScreen.propTypes = {
	actions: PropTypes.object,
	isLoggingIn: PropTypes.bool,
};

export default LoginScreen;
