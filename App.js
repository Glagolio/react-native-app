import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
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
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        });
      } catch (err) {
        console.warn(err.message);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("./assets/photoBG.jpg")}
        >
          <KeyboardAvoidingView
            style={styles.keyboard} // определяем ОС и настраиваем поведение клавиатуры
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <LoginScreen />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "#000",
    // justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  text: {
    color: "#fff",
  },
  keyboard: {
    width: "100%",
  },
});
