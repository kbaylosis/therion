import { connect } from "react-redux";

import RegistrationScreen from "../components/RegistrationScreen";

const mapStateToProps = ({ registration }) => ({
	...registration,
});

export default connect(mapStateToProps)(RegistrationScreen);
