import { connect } from "react-redux";

import { loginInProgress } from "../actions";
import LoginScreen from "../components/LoginScreen";

const mapStateToProps = ({ login }) => ({
  ...login
});

const mapDispatchToProps = dispatch => ({
  login : id => {
    dispatch(loginInProgress());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
