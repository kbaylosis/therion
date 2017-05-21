import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

import styles from "../styles.css.js";

class HomeScreen extends Component {
  static navigationOptions = {
    header : null
  }

  componentWillReceiveProps({ loggedOut, navigation, actions }) {
    if (loggedOut) {
      navigation.goBack();
    }
  }

  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button primary full onPress={props.actions.logout}><Text>Log Out</Text></Button>
      </View>
    );
  }
}

export default HomeScreen;
