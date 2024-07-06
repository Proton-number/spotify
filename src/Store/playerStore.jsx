import { create } from "zustand";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
});

const PlayerStore = create((set) => ({
  isPlayed: true,
  setIsPlayed: (isPlayed) => set({ isPlayed }),

  isFavourite: true,
  setIsFavorite: (isFavourite) => set({ isFavourite }),

  //color for shuffle
  shuffleColor: true,
  setShuffleColor: (shuffleColor) => set({ shuffleColor }),

  //color for repeat
  repeatColor: true,
  setRepeatColor: (repeatColor) => set({ repeatColor }),

  // ACCESS TOKEN
  accessToken: null,
  setAccessToken: (token) => {
    spotifyApi.setAccessToken(token);
    set({ accessToken: token });
  },

  //FETCHING CURRENT SONG

  currentSong: null,
  setCurrentSong: (currentSong) => {
    localStorage.setItem("Current song", JSON.stringify(currentSong));
    set({ currentSong });
  },

//   fetchCurrentSong: async () => {
//     try {
//       console.log("Fetching current song....");
//       const data = await spotifyApi.getMyCurrentPlayingTrack();
//       const currentSong = data.body.item;
//       set({ currentSong });
//       localStorage.setItem("Current song", JSON.stringify(currentSong));
//     } catch (error) {
//       console.error("Error fetching currentSongs:", error);
//     }
//     },
  
    fetchCurrentSong: async () => {
        try {
          console.log("Fetching current song...");
          const data = await spotifyApi.getMyCurrentPlayingTrack();
          if (data.body && data.body.item) {
            const currentSong = data.body.item;
            set({ currentSong });
            localStorage.setItem("Current song", JSON.stringify(currentSong));
          } else {
            console.log("No current song playing.");
          }
        } catch (error) {
          console.error("Error fetching current song:", error);
        }
      },
}));

export default PlayerStore;
