import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider, db } from "../Config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { create } from "zustand";
import { loginWithSpotify } from "../Config/Spotify";
import { sendPasswordResetEmail } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export const useAuthenticationStore = create((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  error: null,
  identifier: "",
  password: "",
  setIdentifier: (identifier) => set({ identifier }),
  setPassword: (password) => set({ password }),

  email: "", //Email for resetting password
  setEmail: (email) => set({ email }),
  sending: false, //for loading animation for button

  //Google Sign-in
  signInWithGoogle: async (navigate) => {
    set({ error: null });
    try {
      // ... existing Google sign-in logic

      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user });
      console.log("Google user data:", result.user);

      const spotifyData = await loginWithSpotify();
      console.log("Spotify data:", spotifyData);

      const userRef = collection(db, "users");
      await addDoc(userRef, {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        spotifyData,
      })
        .then(() => {
          console.log("Firestore write successful");
          navigate("/home");
        })
        .catch((error) => {
          console.error("Firestore write error:", error);
          set({ error: error.message });
        });
    } catch (error) {
      set({ error: error.message });
    }
  },

  //Facebook Sign-in
  signInWithFacebook: async (navigate) => {
    set({ error: null });
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      set({ user: result.user });
      console.log("Facebook user data:", result.user);

      const spotifyData = await loginWithSpotify();
      console.log("Spotify data:", spotifyData);

      const userRef = collection(db, "users");
      await addDoc(userRef, {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        spotifyData,
      })
        .then(() => {
          console.log("Firestore write successful");
          navigate("/home");
        })
        .catch((error) => {
          console.error("Firestore write error:", error);
          set({ error: error.message });
        });
    } catch (error) {
      console.error("Error during Facebook sign-in:", error.message);
      set({ error: error.message });
    }
  },

  //Email and Password Sign in
  signInWithEmailAndPassword: async (email, password, navigate) => {
    set({ error: null });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      set({ user: result.user });
      const spotifyData = await loginWithSpotify();
      console.log("Spotify data:", spotifyData);

      const userRef = collection(db, "users");
      await addDoc(userRef, {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        spotifyData,
      })
        .then(() => {
          console.log("Firestore write successful");
          navigate("/home");
        })
        .catch((error) => {
          console.error("Firestore write error:", error);
          set({ error: error.message });
        });
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      set({ error: error.message });
    }
  },

  signUpWithEmailAndPassword: async (email, password, navigate) => {
    set({ error: null });
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ user: result.user });
      const spotifyData = await loginWithSpotify();
      console.log("Spotify data:", spotifyData);

      const userRef = collection(db, "users");
      await addDoc(userRef, {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        spotifyData,
      })
        .then(() => {
          console.log("Firestore write successful");
          navigate("/home");
        })
        .catch((error) => {
          console.error("Firestore write error:", error);
          set({ error: error.message });
        });
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      set({ error: error.message });
    }
  },

  // Forget password logic
  sendPasswordResetEmail: async (email, navigate) => {
    set({ error: null, sending: true, email: "" });
    try {
      await sendPasswordResetEmail(auth, email);
      navigate("/");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      set({ error: error.message });
    } finally {
      set({ sending: false });
    }
  },

  //Sign out logic
  signOutHandler: async (navigate) => {
    try {
      await signOut(auth);
      set({
        user: null,
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log("Error signing out..", error.message);
      set({ error: error.message });
    }
  },
}));

export default useAuthenticationStore;
