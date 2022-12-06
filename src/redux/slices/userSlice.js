import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUser: (state) => {
      return { ...state, ...initialState };
    },
    setUser: (state, action) => {
      return { ...state, user: action.payload.user, isAuthenticated: true };
    },
  },
});

export const userReducer = userSlice.reducer;
export const setUser = userSlice.actions.setUser;
export const resetUser = userSlice.actions.resetUser;
