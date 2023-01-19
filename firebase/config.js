// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAieElejSMnjEEa5ebIMEDPF_k-NIv80M8",
  authDomain: "react-native-app-663db.firebaseapp.com",
  projectId: "react-native-app-663db",
  storageBucket: "react-native-app-663db.appspot.com",
  messagingSenderId: "793398130633",
  appId: "1:793398130633:web:738a87357b2956e088da18",
  measurementId: "G-BMS2PNR7KB",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(firebase);

export default firebase;
