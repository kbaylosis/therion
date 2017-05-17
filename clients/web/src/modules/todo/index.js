import React from "react";

import reducers from "./reducers";

import Footer from "./components/Footer";
import AddTodo from "./containers/AddTodo";
import VisibleTodoList from "./containers/VisibleTodoList";

export default () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export const Todo = reducers;
