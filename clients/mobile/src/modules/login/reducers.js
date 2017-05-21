import { combineReducers } from "redux";

import * as AppConstants from "../../app/constants";
import * as Types from "./types";

const session = (state = {}, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const isLoggingIn = (state = false, action) => {
  switch(action.type) {
    case Types.LOGIN_INPROGRESS:
      return true;
    case Types.LOGIN_SUCCESS:
    case Types.LOGIN_FAILED:
      return false;
    default:
      return state;
  }
};

const isLoggedIn = (state = false, action) => {
  switch(action.type) {
    case Types.LOGIN_SUCCESS:
      return true;
    case AppConstants.REACT_NAVIGATION_BACK:
      return false;
    default:
      return state;
  }
};

const error = (state = {}, action) => {
  switch(action.type) {
    case Types.LOGIN_FAILED:
      return action.error;
    default:
      return state;
  }
};

export default combineReducers({
  session,
  isLoggingIn,
  isLoggedIn,
  error
});
