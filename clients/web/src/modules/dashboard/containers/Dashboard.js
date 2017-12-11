import { connect } from "react-redux";

import DashboardView from "../components/DashboardView";

const mapStateToProps = ({ dashboard }) => ({
	...dashboard,
});

export default connect(mapStateToProps)(DashboardView);
