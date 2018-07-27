import { connect } from "react-redux";

import LoginScreen from "../components/LoginScreen";

const mapStateToProps = (props) => {
	console.log("mapStateToProps");
	console.log(props);
	return {
		...props.login,
	};
};

export default connect(mapStateToProps)(LoginScreen);
