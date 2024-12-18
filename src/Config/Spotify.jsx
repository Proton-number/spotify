import SpotifyWebApi from "spotify-web-api-node";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URL = import.meta.env.VITE_SPOTIFY_REDIRECT_URL;
const SPOTIFY_SCOPES =
  "user-read-private user-read-email  user-library-read playlist-read-collaborative user-follow-read playlist-read-private user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-recently-played user-library-modify streaming";
const loginWithSpotify = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    SPOTIFY_REDIRECT_URL
  )}&scope=${encodeURIComponent(
    SPOTIFY_SCOPES
  )}&response_type=token&show_dialog=true`;
  window.location.href = authUrl;
};

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
});

export { spotifyApi, loginWithSpotify };
