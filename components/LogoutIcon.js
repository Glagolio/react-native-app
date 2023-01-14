import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// TODO: change auth status to false onPress
const LogoutIcon = ({ style, onPress }) => {
  const navigation = useNavigation();
  return (
    <Ionicons
      name="exit-outline"
      size={24}
      color="#BDBDBD"
      style={style}
      onPress={onPress}
    />
  );
};

export default LogoutIcon;
