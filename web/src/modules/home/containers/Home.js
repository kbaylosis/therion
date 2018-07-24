import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionsCreators from "../actions";
import HomeScreen from "../components/HomeScreen";

const mapStateToProps = ({ home }) => ({
	...home,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
