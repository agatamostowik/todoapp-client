import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    testowy: "pk",
    data: [
      {
        id: Math.random(),
        label: "A",
        subtasks: [
          {
            id: "2",
            label: "C",
            subtasks: [],
          },
          {
            id: "3",
            label: "D",
            subtasks: [
              {
                id: "5",
                label: "H",
                subtasks: [],
              },
              {
                id: "6",
                label: "L",
                subtasks: [],
              },
            ],
          },
        ],
      },
      {
        id: "4",
        label: "B",
        subtasks: [],
      },
      {
        id: "7",
        label: "P",
        subtasks: [],
      },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Math.random(),
        label: action.payload.label,
        subtasks: [],
      };
      return { ...state, data: [...state.data, newTodo] };
    },
  },
});

export const todosReducers = todosSlice.reducer;

export const addTodo = todosSlice.actions.addTodo;
