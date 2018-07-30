import { AppRegistry, YellowBox } from "react-native";

import App from "./src/app/App";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent("therionmobile", () => App);
