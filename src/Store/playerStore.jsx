import { create } from "zustand";
import SpotifyWebApi from "spotify-web-api-node";
import useSpotifyStore from "./SpotifyStore";

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
});

const PlayerStore = create((set) => ({
  isPlayed: true,
  setIsPlayed: (isPlayed) => set({ isPlayed }),

  playCurrentSong: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      console.log("Access Token:", accessToken);
      spotifyApi.setAccessToken(accessToken);
  
      const devices = await spotifyApi.getMyDevices();
      console.log("Devices:", devices.body.devices);
      if (devices.body.devices.length === 0) {
        console.error("No active device available for playback");
        return;
      }
  
      const activeDevice = devices.body.devices.find(device => device.is_active);
      if (!activeDevice) {
        console.error("No active device found. Please start playing on one of your devices.");
        return;
      }
  
      await spotifyApi.play({ device_id: activeDevice.id });
      set({ isPlayed: false }); // update state to indicate it's playing
    } catch (error) {
      console.error("Error playing song:", error);
    }
  },
  
  

  pauseCurrentSong: async () => {
    try {
      await spotifyApi.pause();
      set({ isPlayed: true }); // update state to indicate it's paused
    } catch (error) {
      console.error("Error pausing song:", error);
    }
  },

  isFavourite: true,
  setIsFavorite: (isFavourite) => set({ isFavourite }),

  //color for shuffle
  shuffleColor: true,
  setShuffleColor: (shuffleColor) => set({ shuffleColor }),

  //color for repeat
  repeatColor: true,
  setRepeatColor: (repeatColor) => set({ repeatColor }),

  //FETCHING CURRENT SONG

  currentSong: null,
  setCurrentSong: (currentSong) => {
    set({ currentSong });
  },

  fetchCurrentSong: async () => {
    const accessToken = useSpotifyStore.getState().accessToken;
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    try {
      spotifyApi.setAccessToken(accessToken);
      console.log("Fetching current song....");
      const data = await spotifyApi.getMyCurrentPlayingTrack();
      if (data.body && data.body.item) {
        const currentSong = data.body.item;
        set({ currentSong });
      } else {
        console.warn("No current song playing.");
        set({ currentSong: null });
      }
    } catch (error) {
      console.error("Error fetching current song:", error);
      set({ currentSong: null });
    }
  },
}));

export default PlayerStore;
