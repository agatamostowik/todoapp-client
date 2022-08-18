import { configureStore } from "@reduxjs/toolkit";
import { checkboxReducer } from "./slices/checkboxSlice";
import { todosSlice } from "./slices/todosSlice";

const store = configureStore({
  reducer:  {
    checkbox : checkboxReducer,
    todos: todosSlice.reducer
  },
});



export default store;
