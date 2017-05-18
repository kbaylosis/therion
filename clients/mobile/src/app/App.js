import React from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";

import AppReducer from "./reducers";
import styles from "./styles.css.js";

let store = createStore(AppReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </Provider>
    );
  }
}
