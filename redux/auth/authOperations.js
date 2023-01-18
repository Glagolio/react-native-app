import db from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import authSlice from "./authSlice";

export const authSignUp =
  (email, password, login) => async (dispatch, getSatte) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user created", user);
    } catch (err) {
      console.log("error", err.message);
    }
  };
export const authSignIn = (email, password) => async (dispatch, getSatte) => {
  try {
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("user signIn", user);
    dispatch(authSlice.actions.authSignIn(user));
  } catch (err) {
    console.log("error", err.message);
  }
};
export const authSignOut = () => async (dispatch, getSatte) => {};
