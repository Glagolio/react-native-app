import { createSlice } from "@reduxjs/toolkit";
import { useId } from "react";

const initialState = {
  login: "",
  email: "",
  isAuth: false,
  userId: null,
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
      userId: payload.uid,
    }),
    authLogiIn: (state, { payload }) => ({
      ...state,
      isAuth: true,
    }),
    authSignOut: (state) => ({
      ...initialState,
    }),
  },
});

export default authSlice;
