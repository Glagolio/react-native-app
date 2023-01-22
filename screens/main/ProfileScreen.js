import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import LogoutIcon from "../../components/LogoutIcon";
import { AntDesign } from "@expo/vector-icons";
import PostsListItem from "../../components/PostsListItem";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const ProfileScreen = () => {
  const user = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getOwnerPost();
  }, []);

  const getOwnerPost = async () => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", user.userId)
    );

    const querySnapshot = await getDocs(q);
    setPosts(
      querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => a.createdAt - b.createdAt)
    );

    console.log("profile posts", posts);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../assets/photoBG.jpg")}
      >
        <View style={styles.profileContainer}>
          <LogoutIcon style={styles.logoutBtn} />
          <View style={styles.avatarField}>
            <Image
              style={styles.avatar}
              source={
                user.avatar
                  ? { uri: user.avatar }
                  : require("../../assets/defaultAvatar.jpg")
              }
            />
            {user.avatar ? (
              <TouchableOpacity
                style={styles.addAvatarBtn}
                // onPress={() => setAvatar(null)}
              >
                <AntDesign name="minuscircleo" size={24} color="#E8E8E8" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addAvatarBtn}
                // onPress={uploadAvatar}
              >
                <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.userName}>{user.login}</Text>
          <FlatList
            style={{ marginTop: 33, width: "100%" }}
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <PostsListItem item={item} />}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "#000",
    // justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
    // TODO Remove Height
    height: 600,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  logoutBtn: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  avatarField: {
    position: "absolute",
    // left: "50%",
    top: 0,
    left: "50%",
    transform: [{ translateX: 20 }, { translateY: -10 }],
  },
  addAvatarBtn: {
    position: "absolute",
    top: 16,
    left: 43,
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
  avatar: {
    // position: "absolute",
    // left: "50%",
    transform: [{ translateX: -65 }, { translateY: -50 }],
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  userName: {
    marginTop: 92,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
  },
});

export default ProfileScreen;
