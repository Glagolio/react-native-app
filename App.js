import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import useRoute from "./routers";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  const onPressLogout = () => {
    setIsLogin(false);
  };
  const route = useRoute(isLogin, onPressLogout);

  if (!isReady) {
    return null;
  }

  return <NavigationContainer>{route}</NavigationContainer>;
}
