import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../redux/auth/authOperations";

const RegistrationScreen = ({ navigation }) => {
  const [hidenPassword, setHidePassword] = useState({
    hide: true,
    text: "Show",
  });
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();

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
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = () => {
    console.log({ login, email, password });
    navigation.navigate("Login");
    dispatch(authSignUp(email, password, login));

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
            <View style={styles.registrationForm}>
              <Image
                style={styles.avatar}
                source={require("../../assets/defaultAvatar1.jpg")}
              />
              <Text style={styles.text}>Реєстрація</Text>
              <TextInput
                style={styles.input__login}
                placeholder={"Login"}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={setLogin}
                value={login}
              />
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
                  marginBottom: isShowKeyboard ? 32 : 0,
                }}
              >
                <TextInput
                  style={styles.input__login}
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
                    style={styles.registrationButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.registrationButton__text}>
                      Зареєструватись
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.haveAccountButton}>
                    <Text
                      style={styles.haveAccountButton__text}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Вже є аккаунт? Увійти
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
    marginTop: 92,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
  },
  registrationForm: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
    // height: 549,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
    marginBottom: 16,
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
  showPasswordButton__text: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",

    fontWeight: "400",
    lineHeight: 19,

    color: "#1B4371",
  },
  registrationButton: {
    marginTop: 43,
    width: 343,
    paddingVertical: 16,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  registrationButton__text: {
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  haveAccountButton: {
    marginTop: 16,
    marginBottom: 78,
  },
  haveAccountButton__text: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
    color: "#1B4371",
  },
  buttons: {
    alignItems: "center",
  },
  keyboard: {
    width: "100%",
  },
});

export default RegistrationScreen;
