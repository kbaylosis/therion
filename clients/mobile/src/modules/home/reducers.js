import { combineReducers } from "redux";

import * as ReactNavigationTypes from ".globals/ReactNavigationTypes";
import * as Types from "./types";

const loggedOut = (state = {}, action) => {
  switch (action.type) {
    case Types.LOGOUT:
      return true;
    case ReactNavigationTypes.BACK:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  loggedOut
});
