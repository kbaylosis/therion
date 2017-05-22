import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionCreators from "../actions";
import LoginScreen from "../components/LoginScreen";

const mapStateToProps = ({ login }) => ({
	...login
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(ActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
