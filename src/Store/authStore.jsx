import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../Config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { create } from "zustand";
import { loginWithSpotify } from "../Config/Spotify";
import { sendPasswordResetEmail } from "firebase/auth";

export const useAuthenticationStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
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
      // Set browser session persistence before sign-in
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user });
      loginWithSpotify();
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/home");
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
      loginWithSpotify();
      navigate("/home");
    } catch (error) {
      set({ error: error.message });
    }
  },

  //Apple Sign In

  //Email and Password Sign in
  signInWithEmailAndPassword: async (email, password, navigate) => {
    set({ error: null });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      set({ user: result.user });
      loginWithSpotify();
      navigate("/home");
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
      loginWithSpotify();
      navigate("/home");
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      set({ error: error.message });
    }
  },

  // Forget password logic
  sendPasswordResetEmail: async (email, navigate) => {
    set({ error: null, sending: true, email: "" });
    try {
      await sendPasswordResetEmail(auth, email);
      setTimeout(() => {
        // navigate("/");
      }, 3500);
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      set({ error: error.message });
    } finally {
      set({ sending: false });
    }
  },
}));

export default useAuthenticationStore;
