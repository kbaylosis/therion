import * as Types from "./types";

let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: Types.ADD_TODO,
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: Types.SET_VISIBILITY_FILTER,
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: Types.TOGGLE_TODO,
    id
  }
}
