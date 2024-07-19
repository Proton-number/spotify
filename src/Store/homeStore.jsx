import { create } from "zustand";
import SpotifyWebApi from "spotify-web-api-node";
import useSpotifyStore from "./SpotifyStore";

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
});

const homeStore = create((set) => ({
  recentlyPlayed: [],
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
      const data = await spotifyApi.getFeaturedPlaylists();
      console.log("Fetched featured playlists:", data.body.playlists.items);
      const featuredPlaylists = data.body.playlists.items;
      set({ madeForYou: featuredPlaylists });
      localStorage.setItem("madeForYou", JSON.stringify(featuredPlaylists));
    } catch (error) {
      console.error("Error fetching featured playlists:", error);
    }
  },

  uniquely: [],
  setUniquely: (uniquely) => {
    console.log("Setting Uniquely:", uniquely);
    localStorage.setItem("Uniquely", JSON.stringify(uniquely));
    set({ uniquely });
  },

//   fetchUniquely: async () => {
//     const accessToken = useSpotifyStore.getState().accessToken;
//     if (!accessToken) {
//       console.error("No access token available");
//       return;
//     }
//     try {
//       spotifyApi.setAccessToken(accessToken);
//       console.log("FetchingUniquely....");
//       const data = await spotifyApi.getNewReleases();
//       console.log("Fetched Uniquely:", data.body.items);
//       const unique = data.body.items;
//       set({ uniquely: unique });
//       localStorage.setItem("Uniquely", JSON.stringify(unique));
//     } catch (error) {
//       console.error("Error fetching Uniquely:", error);
//     }
//   },
}));

export default homeStore;
