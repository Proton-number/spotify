import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../Config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { create } from "zustand";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

const useAuthenticationStore = create((set) => ({
  user: null,
  error: null,

  //Google Sign-in
  signInWithGoogle: async () => {
    set({ error: null });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user });
      // navigate("/home");
    } catch (error) {
      set({ error: error.message });
    }
  },

  //Facebook Sign-in
  signInWithFacebook: async () => {
    set({ error: null });
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      set({ user: result.user });
      // navigate("/home");
    } catch (error) {
      set({ error: error.message });
    }
  },

  //Apple Sign In

  //Email and Password Sign in
  signInWithEmailAndPassword: async (email, password) => {
    set({ error: null });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      set({ user: result.user });
      // navigate("/home");
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useAuthenticationStore;
