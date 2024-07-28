import { create } from "zustand";
import SpotifyWebApi from "spotify-web-api-node";
import useSpotifyStore from "./SpotifyStore";

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
});

const PlayerStore = create((set) => ({
  isPlayed: false,
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

      const activeDevice = devices.body.devices.find(
        (device) => device.is_active
      );
      if (!activeDevice) {
        console.error(
          "No active device found. Please start playing on one of your devices."
        );
        return;
      }

      await spotifyApi.play({ device_id: activeDevice.id });
      set({ isPlayed: true }); // update state to indicate it's playing
    } catch (error) {
      console.error("Error playing song:", error);
    }
  },

  pauseCurrentSong: async () => {
    try {
      await spotifyApi.pause();
      set({ isPlayed: false }); // update state to indicate it's paused
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
    console.log("Setting currentSong:", currentSong);
    localStorage.setItem("currentSong", JSON.stringify(currentSong));
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

      const currentPlayingData = await spotifyApi.getMyCurrentPlayingTrack();
      if (currentPlayingData.body && currentPlayingData.body.item) {
        const currentSong = currentPlayingData.body.item;
        set({ currentSong });
        set({ isPlayed: true });
        return;
      }

      const recentlyPlayedData = await spotifyApi.getMyRecentlyPlayedTracks({
        limit: 1,
      });
      if (recentlyPlayedData.body && recentlyPlayedData.body.items.length > 0) {
        const lastPlayedTrack = recentlyPlayedData.body.items[0].track;
        set({ currentSong: lastPlayedTrack });
        set({ isPlayed: false });
        localStorage.setItem("currentSong", JSON.stringify(lastPlayedTrack));
      } else {
        set({ currentSong: null });
        set({ isPlayed: false });
      }
    } catch (error) {
      console.error("Error fetching current song:", error);
      set({ currentSong: null });
      set({ isPlayed: false });
    }
  },
}));

export default PlayerStore;
