import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import PostsListItem from "../../components/PostsListItem";
import {
  collection,
  getDocs,
  orderBy,
  onSnapshot,
  doc,
  orderByChild,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts(
      querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.createdAt - b.createdAt)
    );
    console.log(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const { login, email } = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../../assets/defaultAvatar1.jpg")}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        style={styles.postsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PostsListItem item={item} />}
      />
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
  postsList: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  photo: {
    width: "100%",
    height: "100%",
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

export default PostsScreen;
