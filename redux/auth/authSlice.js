import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  email: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSignIn: (state, { payload }) => ({
      ...state,
      login: payload.displayName,
      email: payload.email,
      isAuth: true,
    }),
  },
});

export default authSlice;
