import React from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign, Fontisto, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import SCREENS
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/main/Home";
import CommentsScreen from "./screens/main/CommentsScreen";
import CreatePostScreen from "./screens/main/CreatePostScreen";
import MapScreen from "./screens/main/MapScreen";
import PostsScreen from "./screens/main/PostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";
import BackArrow from "./components/BackArrow";
import LogoutIcon from "./components/LogoutIcon";
import CreactePostButton from "./components/CreatePostButton";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const useRoute = (isAuth, onPress) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
        <MainStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  }
  return <Home onPress={onPress} />;
};

export default useRoute;

const styles = StyleSheet.create({
  createPostIcon: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  background: {
    backgroundColor: "#FF6C00",

    borderRadius: 20,
  },
});
