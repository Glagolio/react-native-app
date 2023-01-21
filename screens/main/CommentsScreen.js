import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import getCurrentTime from "../../services/getCurrentTime";
import { useFocusEffect } from "@react-navigation/native";

const CommentsScreen = ({ route, navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const { userId, avatar } = useSelector((state) => state.auth);
  const { item } = route.params;

  const sendComment = async () => {
    try {
      await addDoc(collection(db, "posts", item.id, "comments"), {
        comment: {
          user: item.user,
          userId,
          comment: inputValue,
          createdAt: Date.now(),
          avatar: avatar,
        },
      });
      getComments();
    } catch (err) {
      console.log("error", err.message);
    }
  };

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
      console.log("comments", comments);
    } catch (err) {
      console.log("error sending comments", err.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ url: item.image }} style={styles.image} />
        <SafeAreaView style={styles.commentsContainer}>
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View
                style={
                  userId === item.comment.userId
                    ? {
                        ...styles.commentContainer__item,
                        flexDirection: "row-reverse",
                      }
                    : styles.commentContainer__item
                }
              >
                <Image
                  source={{ url: item.comment.avatar }}
                  style={
                    userId === item.comment.userId
                      ? { ...styles.userAvatar, marginRight: 0, marginLeft: 16 }
                      : styles.userAvatar
                  }
                />
                <View style={styles.commentField}>
                  <Text style={styles.comment}>{item.comment.comment}</Text>
                  <Text
                    style={
                      userId === item.comment.userId
                        ? { ...styles.comment__date, textAlign: "left" }
                        : styles.comment__date
                    }
                  >
                    {getCurrentTime(item.comment.createdAt)}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.buttonField} onPress={sendComment}>
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    marginTop: 32,
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  inputField: {
    position: "static",
    marginBottom: 32,
  },
  input: {
    heigth: "100%",
    width: "100%",
    backgroundColor: "#f2f",
    paddingHorizontal: 16,
    paddingVertical: 16,

    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,

    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  buttonField: {
    position: "absolute",
    right: 8,
    top: 4,
    backgroundColor: "#FF6C00",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: "50%",
  },
  commentsContainer: {
    marginTop: 32,
  },
  commentContainer__item: {
    display: "flex",
    flexDirection: "row",
  },

  commentField: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    flex: 1,
  },
  comment: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 16,
    color: "#212121",
  },
  comment__date: {
    marginTop: 8,
    marginRight: 16,
    textAlign: "right",

    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  userAvatar: {
    width: 28,
    height: 28,
    marginRight: 16,
    borderRadius: "50%",
  },
});

export default CommentsScreen;
