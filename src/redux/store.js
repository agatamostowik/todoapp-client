import { configureStore } from "@reduxjs/toolkit";
import { checkboxReducer } from "./slices/checkboxSlice";
import { todosReducers } from "./slices/todosSlice";
import { userReducer } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    checkbox: checkboxReducer,
    todos: todosReducers,
    user: userReducer,
  },
});

export default store;
