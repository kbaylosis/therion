import { connect } from "react-redux";

import LoginScreen from "../components/LoginScreen";

const mapStateToProps = ({ login }) => ({
	...login,
});

export default connect(mapStateToProps)(LoginScreen);
