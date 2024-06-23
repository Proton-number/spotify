import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../Config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { create } from "zustand";
import { loginWithSpotify } from "../Config/Spotify";

const useAuthenticationStore = create((set) => ({
  user: null,
  setUser: (user) => {
    console.log("Setting user:", user);
    set({ user });
  },
  error: null,
  identifier: "",
  password: "",
  setIdentifier: (identifier) => set({ identifier }),
  setPassword: (password) => set({ password }),
  //Google Sign-in
  signInWithGoogle: async (navigate) => {
    set({ error: null });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user });
      loginWithSpotify();
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
}));

export default useAuthenticationStore;
