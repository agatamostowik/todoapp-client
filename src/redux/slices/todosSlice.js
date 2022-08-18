import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    data: [
      {
        id: "1",
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
  reducers: {},
});
