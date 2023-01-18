import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authSignOut } from "../redux/auth/authOperations";

// TODO: change auth status to false onPress
const LogoutIcon = ({ style, onPress }) => {
  const dispatch = useDispatch();

  return (
    <Ionicons
      name="exit-outline"
      size={24}
      color="#BDBDBD"
      style={style}
      onPress={() => dispatch(authSignOut())}
    />
  );
};

export default LogoutIcon;
