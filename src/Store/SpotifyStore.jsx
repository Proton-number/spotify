import { create } from "zustand";
import { spotifyApi } from "../Config/Spotify";

const useSpotifyStore = create((set, get) => ({
  deviceId: null,
  setDeviceId: (deviceId) => set({ deviceId }),

  transferPlaybackToReactApp: async () => {
    try {
      const { accessToken } = get();
      if (!accessToken) return;

      const devicesResponse = await spotifyApi.getMyDevices();
      const devices = devicesResponse.body.devices;

      // Assuming your React app's device is the first one available
      const webPlayerDevice = devices.find(
        (device) => device.type === "Computer"
      );

      if (webPlayerDevice) {
        await spotifyApi.transferMyPlayback([webPlayerDevice.id], {
          play: true, // Automatically start playback
        });
        console.log("Playback transferred to React app");
      } else {
        console.error("No web player device found.");
      }
    } catch (error) {
      console.error("Error transferring playback:", error);
    }
  },

  likedSongs: [],
  setLikedSongs: (likedSongs) => {
    console.log("Setting likedSongs:", likedSongs);
    set({ likedSongs });
  },
  savedAlbums: [],
  setSavedAlbums: (savedAlbums) => {
    console.log("Setting savedAlbums:", savedAlbums);
    localStorage.setItem("savedAlbums", JSON.stringify(savedAlbums));
    set({ savedAlbums });
  },

  userPlaylists: [],
  setUserPlaylists: (userPlaylists) => {
    console.log("Setting userPlaylists:", userPlaylists);
    localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));
    set({ userPlaylists });
  },

  podcasts: [],
  setPodcasts: (podcasts) => {
    console.log("Setting podcasts:", podcasts);
    set({ podcasts });
  },

  artists: [],
  setArtists: (artists) => {
    console.log("Setting artists:", artists);
    localStorage.setItem("savedArtists", JSON.stringify(artists));
    set({ artists });
  },

  // ACCESS TOKEN
  accessToken: null,
  refreshToken: localStorage.getItem("spotifyRefreshToken"), // Retrieve stored refresh token
  setAccessToken: (token) => {
    spotifyApi.setAccessToken(token);
    localStorage.setItem("spotifyAccessToken", token);
    set({ accessToken: token });
  },
  setRefreshToken: (token) => {
    localStorage.setItem("spotifyRefreshToken", token);
    set({ refreshToken: token });
  },

  // Token refresh method
  refreshAccessToken: async () => {
    try {
      const { refreshToken } = get();
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
              import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
            }`
          )}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error_description);

      const { access_token } = data;
      useSpotifyStore.getState().setAccessToken(access_token);

      return access_token;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  },

  // Ensure access token is valid
  refreshAccessTokenIfNeeded: async () => {
    try {
      const { accessToken } = get();
      if (!accessToken) return;

      // If token is expired or about to expire, refresh it
      // For simplicity, assuming token expiration check is implemented
      const tokenIsExpired = false; // Implement actual expiration check

      if (tokenIsExpired) {
        await useSpotifyStore.getState().refreshAccessToken();
      }
    } catch (error) {
      console.error("Error checking or refreshing access token:", error);
    }
  },

  // FETCHING DATA FROM SPOTIFY
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
      localStorage.setItem("savedAlbums", JSON.stringify(data.body.items));
      set({ savedAlbums: data.body.items });
    } catch (error) {
      console.error("Error fetching saved albums:", error);
    }
  },

  fetchSavedPodcasts: async () => {
    try {
      console.log("Fetching saved podcasts...");
      const data = await spotifyApi.getMySavedShows();
      console.log("Fetched Saved Podcasts Data:", data.body.items);
      localStorage.setItem("savedPodcasts", JSON.stringify(data.body.items));
      set({ podcasts: data.body.items });
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  },

  fetchSavedArtists: async () => {
    try {
      console.log("Fetching saved artists....");
      const data = await spotifyApi.getFollowedArtists();
      console.log("Fetched Saved Artists Data:", data.body);
      const artists = data.body.artists.items;
      localStorage.setItem("savedArtists", JSON.stringify(artists));
      set({ artists });
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  },

  fetchSavedPlaylists: async () => {
    try {
      console.log("Fetching saved playlists....");
      const data = await spotifyApi.getUserPlaylists();
      console.log("Fetched Saved Playlists Data:", data.body.items);
      const playlists = data.body.items;
      set({ userPlaylists: playlists });
      localStorage.setItem("savedPlaylists", JSON.stringify(playlists));
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  },
}));

// Initialize the store with the token from local storage if it exists
const initializeStore = () => {
  const accessToken = localStorage.getItem("spotifyAccessToken");
  const refreshToken = localStorage.getItem("spotifyRefreshToken");

  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
    useSpotifyStore.setState({ accessToken, refreshToken });
  }
};

initializeStore();

export default useSpotifyStore;
