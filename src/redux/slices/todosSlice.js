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
      return { ...state, data: [...state.data, action.payload.todo] };
    },
    deleteTodo: (state, action) => {
      return {
        ...state,
        data: state.data.filter((todo) => {
          return !action.payload.todoIds.some((responseId) => {
            return todo.id === responseId.id;
          });
        }),
      };
    },
    editTodo: (state, action) => {
      const foundTodo = state.data.find((todo) => {
        return todo.id === action.payload.id;
      });

      return {
        ...state,
        data: [
          ...state.data.slice(0, state.data.indexOf(foundTodo)),
          action.payload,
          ...state.data.slice(state.data.indexOf(foundTodo) + 1),
        ],
      };
    },
  },
});

export const todosReducers = todosSlice.reducer;

export const addTodo = todosSlice.actions.addTodo;

export const deleteTodo = todosSlice.actions.deleteTodo;

export const setTodos = todosSlice.actions.setTodos;

export const editTodo = todosSlice.actions.editTodo;
