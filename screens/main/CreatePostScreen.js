import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { MaterialIcons, EvilIcons, Feather } from "@expo/vector-icons";

const CreatePostScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [image, setImage] = useState(null);
  const [nameOfPhoto, setNameOfPhoto] = useState("");
  const [locationOfPhoto, setLocationOfPhoto] = useState("");

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
    const location = await Location.getCurrentPositionAsync({});
    navigation.navigate("Posts", {
      image,
      name: nameOfPhoto,
      nameOfLocation: locationOfPhoto,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    resetForm();
  };

  const isDisabled = !image || nameOfPhoto === "" || locationOfPhoto === "";

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
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
        {/* <Image styles={styles.preview} source={} /> */}
        <TouchableOpacity
          style={image ? { ...styles.snap, opacity: 0.3 } : styles.snap}
          onPress={async () => {
            if (cameraRef) {
              const { uri } = await cameraRef.takePictureAsync();
              console.log(cameraRef);
              console.log("uri", uri);
              setImage(uri);
              // await MediaLibrary.createAssetAsync(uri);
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
          style={styles.input__location}
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
    bottom: 15,
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
