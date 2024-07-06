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
    localStorage.setItem("Saved Artists", JSON.stringify(artists));
    set({ artists });
  },

  // ACCESS TOKEN
  accessToken: null,
  setAccessToken: (token) => {
    spotifyApi.setAccessToken(token);
    set({ accessToken: token });
  },

  //FETCHING DATA FROM SPOTIFY
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
      console.error("Error fetching liked songs:", error);
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
      localStorage.setItem("savedArtist", JSON.stringify(artists));
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

export default useSpotifyStore;
