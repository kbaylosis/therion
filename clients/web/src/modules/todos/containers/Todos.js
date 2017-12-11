import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as ActionsCreators from "../actions";
import TodosView from "../components/TodosView";

const mapStateToProps = ({ todos }) => ({
	...todos,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(ActionsCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosView);
