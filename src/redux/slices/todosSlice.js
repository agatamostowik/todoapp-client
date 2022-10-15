import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
  },
  reducers: {
    setTodos: (state, action) => {
      return { ...state, data: action.payload.todos };
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: Math.random(),
        label: action.payload.label,
        subtasks: [],
      };
      return { ...state, data: [...state.data, newTodo] };
    },
    removeTodo: (state, action) => {
      return {
        ...state,
        data: state.data.filter((todo) => action.payload.id !== todo.id),
      };
    },
  },
});

export const todosReducers = todosSlice.reducer;

export const addTodo = todosSlice.actions.addTodo;

export const removeTodo = todosSlice.actions.removeTodo;

export const setTodos = todosSlice.actions.setTodos;
