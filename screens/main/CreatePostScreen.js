import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialIcons, EvilIcons, Feather } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import uploadPhotoToServer from "../../services/uploadPhotoToServer";

const CreatePostScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [image, setImage] = useState(null);
  const [nameOfPhoto, setNameOfPhoto] = useState("");
  const [locationOfPhoto, setLocationOfPhoto] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const resetForm = () => {
    setImage(null);
    setNameOfPhoto("");
    setLocationOfPhoto("");
  };

  const sendPhoto = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const url = await uploadPhotoToServer(image);
      const docOnBack = await addDoc(collection(db, "posts"), {
        user: login,
        userId,
        location: { latitude, longitude },
        locationOfPhoto,
        image: url,
        title: nameOfPhoto,
        createdAt: Date.now(),
      });
      console.log("docOnBack", docOnBack);

      navigation.navigate("Posts");
      resetForm();
    } catch (err) {
      console.log("error", err.message);
    }
  };

  const isDisabled = !image || nameOfPhoto === "" || locationOfPhoto === "";

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          {image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          )}
          <TouchableOpacity
            style={image ? { ...styles.snap, opacity: 0.3 } : styles.snap}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                setImage(uri);
              }
            }}
          >
            <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
        <Text style={styles.hint}>
          {image ? "Редагуйте фото" : "Зробіть фото"}
        </Text>
        <TextInput
          style={styles.input__name}
          placeholder={"Назва..."}
          onChangeText={setNameOfPhoto}
          value={nameOfPhoto}
        />
        <View style={styles.input__field}>
          <TextInput
            style={
              !isShowKeyboard
                ? { ...styles.input__location, marginBottom: 8 }
                : styles.input__location
            }
            placeholder={"Місцевість"}
            onChangeText={setLocationOfPhoto}
            value={locationOfPhoto}
          />
          <EvilIcons
            name="location"
            size={24}
            color="#BDBDBD"
            style={styles.icon__location}
          />
        </View>

        {!isShowKeyboard && (
          <>
            <TouchableOpacity
              style={
                isDisabled
                  ? { ...styles.submitBtn, backgroundColor: "#F6F6F6" }
                  : styles.submitBtn
              }
              disabled={isDisabled}
              onPress={sendPhoto}
            >
              <Text
                style={
                  isDisabled
                    ? { ...styles.submitBtn__text, color: "#BDBDBD" }
                    : styles.submitBtn__text
                }
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={resetForm}>
              <Feather name="trash" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#fff",
    // justifyContent: 'center',
  },
  camera: {
    marginHorizontal: 16,
    marginTop: 32,
    height: 240,
    position: "relative",
    borderRadius: 8,
  },
  snap: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    top: 90,
    zIndex: 100,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderColor: "#f5f",
    borderWidth: 1,
    borderRadius: 8,
  },
  hint: {
    marginTop: 8,
    marginLeft: 16,
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  input__name: {
    marginTop: 48,
    marginLeft: 16,
    marginRight: 16,

    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  input__field: {
    marginTop: 48,
    marginLeft: 16,
    marginRight: 16,

    position: "relative",
  },
  input__location: {
    paddingBottom: 15,
    paddingLeft: 28,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  icon__location: {
    position: "absolute",
    bottom: 22,
    left: 0,
  },
  submitBtn: {
    marginTop: 48,
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    borderRadius: 100,
  },
  submitBtn__text: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  cancelBtn: {
    marginTop: "auto",
    marginBottom: 34,
    alignSelf: "center",
    paddingHorizontal: 23,
    paddingVertical: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

export default CreatePostScreen;
