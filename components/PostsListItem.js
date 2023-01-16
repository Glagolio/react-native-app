import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const PostsListItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, marginBottom: 32 }}>
      <Image source={{ uri: item.image }} style={styles.photo} />
      <Text style={styles.title}>{item.name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("Comments")}
        >
          <EvilIcons
            name="comment"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 9 }}
          />
          <Text style={styles.comments}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ display: "flex", flexDirection: "row" }}
          onPress={() => {
            navigation.navigate("Map", {
              latitude: item.latitude,
              longitude: item.longitude,
              title: item.name,
            });
          }}
        >
          <EvilIcons name="location" size={24} color="#BDBDBD" />
          <Text style={styles.comments}>{item.nameOfLocation}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: "100%",
    height: 240,
    marginBottom: 8,
  },
  title: {
    marginBottom: 11,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  comments: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
});

export default PostsListItem;
