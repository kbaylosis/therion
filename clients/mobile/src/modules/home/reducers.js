import { combineReducers } from "redux";

import * as Types from "./types";

const loggedOut = (state = {}, action) => {
  switch (action.type) {
    case Types.LOGOUT:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  loggedOut
});
