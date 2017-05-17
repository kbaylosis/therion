import { combineReducers } from "redux";

import * as Types from "./types";
import * as Constants from "./constants";

const todo = (state = {}, action) => {
  switch (action.type) {
    case Types.ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case Types.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });

    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case Types.ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case Types.TOGGLE_TODO:
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

const visibilityFilter = (state = Constants.SHOW_ALL, action) => {
  switch (action.type) {
    case Types.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default combineReducers({
  todos,
  visibilityFilter
});
