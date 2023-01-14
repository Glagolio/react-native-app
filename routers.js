import React from "react";
import { StyleSheet, Button, Link } from "react-native";
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
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Публікації",
          tabBarButton: () => null,
          headerRight: () => (
            <LogoutIcon style={{ marginRight: 20 }} onPress={onPress} />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ focused, size, color }) => (
            <Fontisto
              name="plus-a"
              size={24}
              color="white"
              style={styles.createPostIcon}
            />
          ),
          headerLeft: () => <BackArrow style={{ marginLeft: 20 }} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default useRoute;

const styles = StyleSheet.create({
  createPostIcon: {
    backgroundColor: "#FF6C00",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
