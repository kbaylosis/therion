import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Button } from "native-base";

import styles from "../styles.css.js";

class HomeScreen extends Component {
	static navigationOptions = {
		header: null,
	}

	static propTypes = {
		actions: PropTypes.object,
		navigation: PropTypes.object,
		screenProps: PropTypes.object,
		loggedOut: PropTypes.bool,
	}

	componentDidMount() {
		this.props.actions.setAsLoggedIn();
		this.props.screenProps.db.findAllUsers("home/user", {},
			[ "id", "firstname", "lastname" ]);
	}

	componentDidUpdate(prevProps) {
		const { loggedOut, navigation } = this.props;

		if (prevProps.loggedOut !== loggedOut && loggedOut) {
			navigation.goBack();
		}
	}

	render() {
		const { actions } = this.props;

		console.log(this.props);

		return (
			<View style={styles.container}>
				<Text>Home Screen</Text>
				<Button primary full onPress={actions.logoutInProgress}><Text>Log Out</Text></Button>
			</View>
		);
	}
}

export default HomeScreen;
