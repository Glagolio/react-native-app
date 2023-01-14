import React from "react";

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

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const useRoute = (isLogin) => {
  if (!isLogin) {
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
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Публікації",
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{ title: "Публікації" }}
      />
      <Tab.Screen name="Створити пост" component={CreatePostScreen} />
      <Tab.Screen name="Профайл" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default useRoute;
