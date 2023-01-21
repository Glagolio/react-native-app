import db from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import authSlice from "./authSlice";

export const authSignUp =
  (email, password, login, avatar) => async (dispatch, getSatte) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: login,
        photoURL: avatar,
      });

      console.log("user created", user);
    } catch (err) {
      console.log("error", err.message);
    }
  };
export const authSignIn = (email, password) => async (dispatch, getSatte) => {
  try {
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("user", user);
    dispatch(authSlice.actions.authSignIn(user));
  } catch (err) {
    console.log("error", err.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getSatte) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      dispatch(authSlice.actions.authSignIn(user));
      dispatch(authSlice.actions.authLogiIn(true));
    }
  } catch (err) {
    console.log("error", err.message);
  }
};

export const authSignOut = () => async (dispatch, getSatte) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (err) {
    console.log("error", err.message);
  }
};
