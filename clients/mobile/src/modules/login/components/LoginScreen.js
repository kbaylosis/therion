import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Spinner } from "native-base";

import * as AppConstants from "app/constants";

import styles from "../styles.css.js";

class LoginScreen extends Component {
  static navigationOptions = {
    header : null
  }

  componentWillReceiveProps({ isLoggedIn, navigation, actions }) {
    if (isLoggedIn) {
      navigation.navigate(AppConstants.HOME_SCREEN);
    }
  }

  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
        {
          props.isLoggingIn ?
          <Spinner color="blue"/>
          :
          <Button primary full onPress={props.actions.loginInProgress}><Text>Log In</Text></Button>
        }
      </View>
    );
  }
}

export default LoginScreen;
