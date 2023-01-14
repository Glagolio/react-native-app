import React from "react";
import { StyleSheet, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const CreatePostButton = () => {
  return (
    <View style={styles.background}>
      <Fontisto
        name="plus-a"
        size={24}
        color="white"
        style={styles.createPostIcon}
      />
    </View>
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

export default CreatePostButton;
