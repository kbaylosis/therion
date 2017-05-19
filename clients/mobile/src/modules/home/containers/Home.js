import { connect } from "react-redux";

import { logout } from "../actions";
import HomeScreen from "../components/HomeScreen";

const mapStateToProps = ({ home }) => ({
  ...home
});

const mapDispatchToProps = dispatch => ({
  logout : () => {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
