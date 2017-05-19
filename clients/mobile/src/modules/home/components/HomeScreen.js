import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

import styles from "../styles.css.js";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header : null
  }

  componentWillReceiveProps({ loggedOut }) {
    if (loggedOut) {
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button primary full onPress={this.props.logout}><Text>Log Out</Text></Button>
      </View>
    );
  }
}

export default HomeScreen;
