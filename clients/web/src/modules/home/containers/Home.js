import { connect } from "react-redux";

import HomeScreen from "../components/HomeScreen";

const mapStateToProps = ({ home }) => ({
	...home,
});

export default connect(mapStateToProps)(HomeScreen);
