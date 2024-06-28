import SpotifyWebApi from "spotify-web-api-node";
import { create } from "zustand";

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
});

const useSpotifyStore = create((set) => ({
  likedSongs: [],
  setLikedSongs: (likedSongs) => {
    console.log("Setting likedSongs:", likedSongs);
    set({ likedSongs });
  },
  savedAlbums: [],
  setSavedAlbums: (savedAlbums) => {
    console.log("Setting savedAlbums:", savedAlbums);
    set({ savedAlbums });
  },
  userPlaylists: [],
  setUserPlaylists: (setUserPlaylists) => set({ setUserPlaylists }),
  followedArtists: [],
  setFollowedArtists: (setFollowedArtists) => set({ setFollowedArtists }),
  podcasts: [],
  setPodcasts: (setPodcasts) => set({ setPodcasts }),

  // ACCESS TOKEN
  accessToken: null,
  setAccessToken: (token) => {
    spotifyApi.setAccessToken(token);
    set({ accessToken: token });
  },

  fetchLikedSongs: async () => {
    try {
      console.log("Fetching liked songs...");
      const data = await spotifyApi.getMySavedTracks();
      console.log("Fetched Liked Songs Data:", data.body.items);
      set({ likedSongs: data.body.items });
    } catch (error) {
      console.error("Error fetching liked songs:", error);
    }
  },
  fetchSavedAlbums: async () => {
    try {
      console.log("Fetching saved albums...");
      const data = await spotifyApi.getMySavedAlbums();
      console.log("Fetched Saved Albums Data:", data.body.items);
      set({ savedAlbums: data.body.items });
    } catch (error) {
      console.error("Error fetching liked songs:", error);
    }
  },
  fetchPodcasts: async () => {
    try {
      const data = await spotifyApi.getMyShows();
      set({ podcasts: data.body.items });
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  },
  fetchFollowedArtists: async () => {
    try {
      const data = await spotifyApi.getMyFollowedArtists();
      set({ followedArtists: data.body.items });
    } catch (error) {
      console.error("Error fetching followed artists:", error);
    }
  },
}));

export default useSpotifyStore;
