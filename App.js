import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./components/Main";

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
          "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
