import { create } from "zustand";
import SpotifyWebApi from "spotify-web-api-node";
import useSpotifyStore from "./SpotifyStore";

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
});

const searchStore = create((set) => ({
  categories: [],
  setCategories: (categories) => {
    console.log("Setting categories:", categories);
    localStorage.setItem("categories", JSON.stringify(categories));
    set({ categories });
  },

  fetchCategories: async () => {
    const accessToken = useSpotifyStore.getState().accessToken;
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      spotifyApi.setAccessToken(accessToken);
      console.log("Fetching categories...");
      const data = await spotifyApi.getCategories({ limit: 50 });
      console.log("Fetched Categories Data:", data.body.categories.items);
      const category = data.body.categories.items;
      set({ categories: category });
      localStorage.setItem("categories", JSON.stringify(category));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  //for searchbar
  inputValue: "",
  setInputValue: (inputValue) => set({inputValue})
}));

export default searchStore;
