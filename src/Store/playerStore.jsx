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

  // Method to transfer playback to a specific device
  transferPlayback: async (deviceId) => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }
      spotifyApi.setAccessToken(accessToken);
      await spotifyApi.transferMyPlayback([deviceId], { play: true });
      console.log(`Playback transferred to device ID: ${deviceId}`);
    } catch (error) {
      console.error("Error transferring playback:", error);
    }
  },

  // Method to get devices and transfer playback to the first available device
  playOnDevice: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }

      spotifyApi.setAccessToken(accessToken);
      const devices = await spotifyApi.getMyDevices();
      if (devices.body.devices.length === 0) {
        console.error("No available devices for playback");
        return;
      }

      const deviceId = devices.body.devices[0].id; // Choose your device logic here
      await PlayerStore.getState().transferPlayback(deviceId);
    } catch (error) {
      console.error("Error playing on device:", error);
    }
  },

  playCurrentSong: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }

      spotifyApi.setAccessToken(accessToken);
      const devices = await spotifyApi.getMyDevices();
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
      const currentPlayingData = await spotifyApi.getMyCurrentPlayingTrack();
      if (currentPlayingData.body && currentPlayingData.body.item) {
        const currentSong = currentPlayingData.body.item;
        set({ currentSong, isPlayed: false });
        localStorage.setItem("currentSong", JSON.stringify(currentSong));
      }
    } catch (error) {
      console.error("Error playing song:", error);
    }
  },

  pauseCurrentSong: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }

      spotifyApi.setAccessToken(accessToken);
      const devices = await spotifyApi.getMyDevices();
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

      await spotifyApi.pause({ device_id: activeDevice.id });
      const currentPlayingData = await spotifyApi.getMyCurrentPlayingTrack();
      if (currentPlayingData.body && currentPlayingData.body.item) {
        const currentSong = currentPlayingData.body.item;
        set({ currentSong, isPlayed: true });
        localStorage.setItem("currentSong", JSON.stringify(currentSong));
      }
    } catch (error) {
      console.error("Error pausing song:", error);
      if (
        error.body &&
        error.body.error &&
        error.body.error.reason === "UNKNOWN"
      ) {
        set({ isPlayed: false }); // Set state to false to show play button
        alert(
          "Failed to pause the song due to a restriction. Please try again later."
        );
      }
    }
  },

  // for shuffle
  shuffle: false,
  setShuffle: (shuffle) => set({ shuffle }),

  //method for shuffle
  toggleShuffle: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }
      spotifyApi.setAccessToken(accessToken);

      const devices = await spotifyApi.getMyDevices();
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
      const newShuffleState = !PlayerStore.getState().shuffle;
      await spotifyApi.setShuffle(newShuffleState, {
        device_id: activeDevice.id,
      });
      set({ shuffle: newShuffleState });
    } catch (error) {
      console.error("Error toggling shuffle:", error);
    }
  },

  // color for repeat
  repeat: false,
  setRepeat: (repeat) => set({ repeat }),
  //method to toggle repeat
  toggleRepeat: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }
      spotifyApi.setAccessToken(accessToken);

      const devices = await spotifyApi.getMyDevices();
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
      const currentRepeat = PlayerStore.getState().repeat;
      let newRepeat;
      switch (currentRepeat) {
        case "off":
          newRepeat = "context";
          break;
        case "context":
          newRepeat = "track";
          break;
        case "track":
        default:
          newRepeat = "off";
          break;
      }
      await spotifyApi.setRepeat(newRepeat, {
        device_id: activeDevice.id,
      });
      set({ repeat: newRepeat });
    } catch (error) {
      console.error("Error toggling repeat:", error);
    }
  },

  // FETCHING CURRENT SONG
  currentSong: JSON.parse(localStorage.getItem("currentSong")) || null,
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
        set({ currentSong, isPlayed: !currentPlayingData.body.is_playing });
        localStorage.setItem("currentSong", JSON.stringify(currentSong));
        return;
      }

      const recentlyPlayedData = await spotifyApi.getMyRecentlyPlayedTracks({
        limit: 1,
      });
      if (recentlyPlayedData.body && recentlyPlayedData.body.items.length > 0) {
        const lastPlayedTrack = recentlyPlayedData.body.items[0].track;
        set({ currentSong: lastPlayedTrack, isPlayed: true });
        localStorage.setItem("currentSong", JSON.stringify(lastPlayedTrack));
      } else {
        set({ currentSong: null, isPlayed: true });
      }
    } catch (error) {
      console.error("Error fetching current song:", error);
      set({ currentSong: null, isPlayed: true });
    }
  },

  isFavourite: false,
  setIsFavorite: (isFavourite) => set({ isFavourite }),
  //to check if liked
  checkIfLiked: async (trackId) => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }

      spotifyApi.setAccessToken(accessToken);
      const { body: isLikedArray } = await spotifyApi.containsMySavedTracks([
        trackId,
      ]);
      set({ isFavourite: isLikedArray[0] });
    } catch (error) {
      console.error("Error checking if track is liked:", error);
    }
  },
  // Method to like the current song
  likeCurrentSong: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      const { currentSong } = PlayerStore.getState();
      if (!accessToken || !currentSong) {
        console.error("No access token or current song available");
        return;
      }

      spotifyApi.setAccessToken(accessToken);
      await spotifyApi.addToMySavedTracks([currentSong.id]);
      set({ isFavourite: true });
    } catch (error) {
      console.error("Error liking the song:", error);
    }
  },
  // Method to unlike the current song
  unlikeCurrentSong: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      const { currentSong } = PlayerStore.getState();
      if (!accessToken || !currentSong) {
        console.error("No access token or current song available");
        return;
      }

      spotifyApi.setAccessToken(accessToken);
      await spotifyApi.removeFromMySavedTracks([currentSong.id]);
      set({ isLiked: false });
    } catch (error) {
      console.error("Error unliking the song:", error);
    }
  },

  //method to get previous song
  previousSong: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }
      spotifyApi.setAccessToken(accessToken);
      const devices = await spotifyApi.getMyDevices();
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
      await spotifyApi.skipToPrevious({ device_id: activeDevice.id });
      const currentPlayingData = await spotifyApi.getMyCurrentPlayingTrack();
      if (currentPlayingData.body && currentPlayingData.body.item) {
        const currentSong = currentPlayingData.body.item;
        set({ currentSong, isPlayed: false });
        localStorage.setItem("currentSong", JSON.stringify(currentSong));
      }
    } catch (error) {
      console.error("Error skipping to the previous song:", error);
    }
  },

  nextSong: async () => {
    try {
      const accessToken = useSpotifyStore.getState().accessToken;
      if (!accessToken) {
        console.error("No access token available");
        return;
      }

      spotifyApi.setAccessToken(accessToken);

      // Get available devices
      const devices = await spotifyApi.getMyDevices();
      if (devices.body.devices.length === 0) {
        console.error("No active device available for playback");
        return;
      }

      // Find the active device
      const activeDevice = devices.body.devices.find(
        (device) => device.is_active
      );
      if (!activeDevice) {
        console.error(
          "No active device found. Please start playing on one of your devices."
        );
        return;
      }

      // Skip to the next track
      await spotifyApi.skipToNext({ device_id: activeDevice.id });

      // Fetch the current playing track to update the state
      const currentPlayingData = await spotifyApi.getMyCurrentPlayingTrack();
      if (currentPlayingData.body && currentPlayingData.body.item) {
        const currentSong = currentPlayingData.body.item;
        set({ currentSong, isPlayed: false });
        localStorage.setItem("currentSong", JSON.stringify(currentSong));
      }
    } catch (error) {
      console.error("Error skipping to the next song:", error);
    }
  },
}));

export default PlayerStore;
