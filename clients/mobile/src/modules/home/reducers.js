import { combineReducers } from "redux";

import * as AppConstants from "../../app/constants";
import * as Types from "./types";

const loggedOut = (state = {}, action) => {
  switch (action.type) {
    case Types.LOGOUT:
      return true;
    case AppConstants.REACT_NAVIGATION_BACK:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  loggedOut
});
