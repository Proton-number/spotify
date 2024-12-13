import { create } from "zustand";
import { spotifyApi } from "../Config/Spotify";
import useSpotifyStore from "./SpotifyStore";


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
  setInputValue: (inputValue) => set({ inputValue }),
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
  searchSpotify: async () => {
    const { inputValue } = searchStore.getState();
    const accessToken = useSpotifyStore.getState().accessToken;
    if (!inputValue || !accessToken) return;

    try {
      spotifyApi.setAccessToken(accessToken);
      const data = await spotifyApi.search(inputValue, ['track', 'album', 'artist'], { limit: 20 });
      set({ searchResults: data.body });
    } catch (error) {
      console.error("Error searching Spotify:", error);
    }
  }


}));

export default searchStore;
