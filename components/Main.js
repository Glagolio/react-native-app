import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import db from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

import useRoute from "../routers";

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
    console.log("useEffect working");
  }, []);
  // db.auth().onAuthStateChange((state) => setIsLogin(state));
  const onPressLogout = () => {
    setIsLogin(false);
  };
  const route = useRoute(isAuth, onPressLogout);

  return <NavigationContainer>{route}</NavigationContainer>;
};

export default Main;
