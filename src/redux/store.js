import { configureStore } from "@reduxjs/toolkit";

import { todosReducers } from "./slices/todosSlice";
import { userReducer } from "./slices/userSlice";
import { tagsReducers } from "./slices/tagsSlice";

const store = configureStore({
  reducer: {
    todos: todosReducers,
    user: userReducer,
    tags: tagsReducers,
  },
});

export default store;
