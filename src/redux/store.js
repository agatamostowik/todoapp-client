import { configureStore } from "@reduxjs/toolkit";
import { checkboxReducer } from "./slices/checkboxSlice";
import { todosReducers } from "./slices/todosSlice";

const store = configureStore({
  reducer:  {
    checkbox : checkboxReducer,
    todos: todosReducers
  },
});



export default store;
