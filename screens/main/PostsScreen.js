import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../../assets/defaultAvatar1.jpg")}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "#fff",
    // justifyContent: 'center',
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginLeft: 16,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "Roboto-Bold",
  },
  email: {
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default PostsScreen;
