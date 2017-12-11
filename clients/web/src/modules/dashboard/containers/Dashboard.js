import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionsCreators from "../actions";
import DashboardView from "../components/DashboardView";

const mapStateToProps = ({ dashboard }) => ({
	...dashboard,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
