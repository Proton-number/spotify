import { create } from "zustand";
import { spotifyApi } from "../Config/Spotify";
import useSpotifyStore from "./SpotifyStore";

const homeStore = create((set) => ({
  recentlyPlayed: JSON.parse(localStorage.getItem("recentlyPlayed")) || [],

  setRecentlyPlayed: (recentlyPlayed) => {
    console.log("Setting recentlyPlayed:", recentlyPlayed);
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));

    set({ recentlyPlayed });
  },
  fetchRecentlyPlayed: async () => {
    const accessToken = useSpotifyStore.getState().accessToken;
    if (!accessToken) {
      console.error("No access token available");
      return;
    }
    try {
      spotifyApi.setAccessToken(accessToken);
      console.log("Fetching recently played tracks....");
      const data = await spotifyApi.getMyRecentlyPlayedTracks();
      console.log("Fetched recently played tracks:", data.body.items);
      const recent = data.body.items;
      set({ recentlyPlayed: recent });
      localStorage.setItem("recentlyPlayed", JSON.stringify(recent));
    } catch (error) {
      console.error("Error fetching recently played tracks:", error);
    }
  },

  madeForYou: [],
  setMadeForYou: (madeForYou) => {
    console.log("Setting madeForYou:", madeForYou);
    localStorage.setItem("madeForYou", JSON.stringify(madeForYou));
    set({ madeForYou });
  },

  fetchMadeForYou: async () => {
    const accessToken = useSpotifyStore.getState().accessToken;
    if (!accessToken) {
      console.error("No access token available");
      return;
    }
    try {
      spotifyApi.setAccessToken(accessToken);
      const data = await spotifyApi.getFeaturedPlaylists({ limit: 5 });
      console.log("Fetched featured playlists:", data.body.playlists.items);
      const featuredPlaylists = data.body.playlists.items;
      set({ madeForYou: featuredPlaylists });
      localStorage.setItem("madeForYou", JSON.stringify(featuredPlaylists));
    } catch (error) {
      console.error("Error fetching featured playlists:", error);
    }
  },
}));

export default homeStore;
