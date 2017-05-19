import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Spinner } from "native-base";

import * as AppConstants from "../../../app/constants";

import styles from "../styles.css.js";

class LoginScreen extends Component {
  static navigationOptions = {
    header : null
  }

  componentWillReceiveProps({ isLoggedIn }) {
    if (isLoggedIn) {
      this.props.navigation.navigate(AppConstants.HOME_SCREEN);
      this.props.actions.loginScreenExit();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
        {
          this.props.isLoggingIn ?
          <Spinner color="blue"/>
          :
          <Button primary full onPress={this.props.actions.loginInProgress}><Text>Log In</Text></Button>
        }
      </View>
    );
  }
}

export default LoginScreen;
