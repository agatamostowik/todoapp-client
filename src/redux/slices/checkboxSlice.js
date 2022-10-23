import { createSlice } from "@reduxjs/toolkit";

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState: {
    checkedIds: [],
  },
  reducers: {
    toggleCheck: (state, action) => {
      if (state.checkedIds.includes(action.payload.id)) {
        return {
          ...state,
          checkedIds: state.checkedIds.filter((id) => id !== action.payload.id),
        };
      } else {
        return {
          ...state,
          checkedIds: [...state.checkedIds, action.payload.id],
        };
      }
    },
  },
});
export const checkboxReducer = checkboxSlice.reducer;

export const toggleCheck = checkboxSlice.actions.toggleCheck;
