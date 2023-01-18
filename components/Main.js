import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import db from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

import useRoute from "../routers";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const user = useSelector((state) => state.auth.isAuth);

  const route = useRoute(user);

  return <NavigationContainer>{route}</NavigationContainer>;
};

export default Main;
