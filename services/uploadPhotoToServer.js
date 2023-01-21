import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-uuid";
import { storage } from "../firebase/config";

const uploadPhotoToServer = async (image) => {
  try {
    const response = await fetch(image);
    const file = await response.blob();

    const postId = uuid().toString();

    const storageRef = ref(storage, `postImage/${postId}`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    return url;
  } catch (err) {
    console.log("error uploading photo to server", err.message);
  }
};

export default uploadPhotoToServer;
