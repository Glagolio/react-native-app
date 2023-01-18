import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store";

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
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
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

  return (
    <Provider store={store}>
      <NavigationContainer>{route}</NavigationContainer>
    </Provider>
  );
}
