import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [hidenPassword, setHidePassword] = useState({
    hide: true,
    text: "Show",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const hidePassword = () => {
    if (hidenPassword.hide) {
      setHidePassword({ hide: false, text: "Hide" });
    } else {
      setHidePassword({ hide: true, text: "Show" });
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = () => {
    console.log({ email, password });

    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../../assets/photoBG.jpg")}
        >
          <KeyboardAvoidingView
            style={styles.keyboard}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.loginForm}>
              <Text style={styles.text}>Войти</Text>
              <TextInput
                style={styles.input__login}
                placeholder={"Enter the email"}
                dataDetectorTypes={"address"}
                onChangeText={setEmail}
                value={email}
              />
              <View
                style={{
                  ...styles.password,
                  marginBottom: isShowKeyboard ? 40 : 0,
                }}
              >
                <TextInput
                  style={styles.input}
                  secureTextEntry={hidenPassword.hide}
                  dataDetectorTypes={"all"}
                  placeholder={"Enter the password"}
                  onChangeText={setPassword}
                  value={password}
                />
                <TouchableOpacity
                  style={styles.showPasswordButton}
                  onPress={hidePassword}
                >
                  <Text style={styles.showPasswordButton__text}>
                    {hidenPassword.text}
                  </Text>
                </TouchableOpacity>
              </View>
              {!isShowKeyboard && (
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.loginButton__text}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.haveAccountButton}>
                    <Text
                      style={styles.haveAccountButton__text}
                      onPress={() => navigation.navigate("Register")}
                    >
                      Немає аккаунта? Зареєструватись
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  text: {
    marginTop: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
  },
  loginForm: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input__login: {
    marginTop: 33,
    borderColor: "#fff",
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,

    paddingHorizontal: 16,
    paddingVertical: 16,

    fontSize: 16,
    fontFamily: "Roboto-Regular",

    fontWeight: "400",
    lineHeight: 19,
  },
  input: {
    marginTop: 16,
    borderColor: "#fff",
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,

    paddingHorizontal: 16,
    paddingVertical: 16,

    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },
  password: {
    position: "relative",
  },
  showPasswordButton: {
    position: "absolute",
    right: 16,
    top: "50%",
  },
  loginButton: {
    marginTop: 43,
    width: 343,
    paddingVertical: 16,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  loginButton__text: {
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  haveAccountButton: {
    marginTop: 16,
  },
  haveAccountButton__text: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
    color: "#1B4371",
  },
  buttons: {
    alignItems: "center",
    marginBottom: 144,
  },
});

export default LoginScreen;
