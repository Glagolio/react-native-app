import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { FontAwesome } from "@expo/vector-icons";

const PostsListItem = ({ item }) => {
  const [comments, setComments] = useState([]);
  const navigation = useNavigation();

  const getComments = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "posts", item.id, "comments")
      );
      const comments = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => a.comment.createdAt - b.comment.createdAt);
      setComments(comments);
    } catch (err) {
      console.log("error sending comments", err.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <View style={{ flex: 1, marginBottom: 32 }}>
      <Image source={{ uri: item.image }} style={styles.photo} />
      <Text style={styles.title}>{item.title}</Text>
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
          onPress={() => navigation.navigate("Comments", { item })}
        >
          {comments.length > 0 ? (
            <FontAwesome
              name="comment"
              size={18}
              color="#FF6C00"
              style={{ marginRight: 9 }}
            />
          ) : (
            <FontAwesome
              name="comment-o"
              size={18}
              color="#BDBDBD"
              style={{ marginRight: 9 }}
            />
          )}

          <Text style={styles.comments}>{comments.length}</Text>
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
          <Text style={styles.location}>{item.locationOfPhoto}</Text>
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
  location: {
    textDecorationLine: "underline",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
});

export default PostsListItem;
