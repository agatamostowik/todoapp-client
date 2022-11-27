import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload.user, isAuthenticated: true };
    },
  },
});

export const userReducer = userSlice.reducer;
export const setUser = userSlice.actions.setUser;
