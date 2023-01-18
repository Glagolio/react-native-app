import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import SCREENS
import CommentsScreen from "./CommentsScreen";
import CreatePostScreen from "./CreatePostScreen";
import MapScreen from "./MapScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import BackArrow from "../../components/BackArrow";
import LogoutIcon from "../../components/LogoutIcon";
import CreactePostButton from "../../components/CreatePostButton";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={24} color="black" />
          ),
          headerRight: () => <LogoutIcon style={{ marginRight: 20 }} />,
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ focused, size, color }) => <CreactePostButton />,
          headerLeft: () => <BackArrow style={{ marginLeft: 20 }} />,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerLeft: () => <BackArrow style={{ marginLeft: 20 }} />,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
          headerLeft: () => <BackArrow style={{ marginLeft: 20 }} />,
          tabBarButton: () => null,
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

export default Home;
