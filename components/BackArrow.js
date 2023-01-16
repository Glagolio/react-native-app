import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const BackArrow = ({ style }) => {
  const navigation = useNavigation();
  return (
    <Ionicons
      name="arrow-back"
      size={24}
      color="#BDBDBD"
      style={style}
      onPress={() => navigation.navigate("Posts")}
    />
  );
};

export default BackArrow;
