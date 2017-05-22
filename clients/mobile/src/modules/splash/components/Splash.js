import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Spinner } from "native-base";

import * as AppConstants from "__src/app/constants";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles.css.js";

class Splash extends Component {
	static navigationOptions = {
		header : null
	}

	static propTypes = {
		navigation : PropTypes.object
	}

	componentDidMount() {
		setTimeout(() => {
			this.props.navigation.navigate(AppConstants.LOGIN_SCREEN);
		}, AppConstants.SPLASH_TIMEOUT);
	}

	render() {
		return (
			<View style={styles.container}>
				<Icon name="rocket" size={30} color="#900" />
				<Text>Splash Screen</Text>
				<Spinner color='blue' />
			</View>
		);
	}
}

export default Splash;
