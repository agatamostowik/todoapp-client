import { createSlice } from "@reduxjs/toolkit";

export const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    data: [],
  },
  reducers: {
    setTags: (state, action) => {
      return { ...state, data: action.payload.tags };
    },
  },
});

export const tagsReducers = tagsSlice.reducer;
export const setTags = tagsSlice.actions.setTags;
