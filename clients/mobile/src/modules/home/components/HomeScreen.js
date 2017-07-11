import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

import styles from "../styles.css.js";

class HomeScreen extends Component {
	static navigationOptions = {
		header: null,
	}

	componentWillReceiveProps({ loggedOut, navigation }) {
		if (loggedOut) {
			navigation.goBack();
		}
	}

	render() {
		const { actions } = this.props;


		return (
			<View style={styles.container}>
			<Text>Home Screen</Text>
			<Button primary full onPress={actions.logout}><Text>Log Out</Text></Button>
			</View>
		);
	}
}

HomeScreen.propTypes = {
	actions: React.PropTypes.object,
};

export default HomeScreen;
