import { useEffect } from "react";
import useSpotifyStore from "../Store/SpotifyStore";
import PlayerStore from "../Store/playerStore";

function PlayBack() {
  const { accessToken } = useSpotifyStore();
  const { setDeviceId, setPlayerState } = PlayerStore();

  useEffect(() => {
    if (!accessToken) return;

    // Function to initialize the Spotify player
    const initializePlayer = () => {
      if (!window.Spotify) {
        console.error("Spotify Web Playback SDK is not loaded.");
        return;
      }

      const player = new window.Spotify.Player({
        name: "Web Playback SDK Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      // Event listeners
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID:", device_id);
        setDeviceId(device_id); // Store the device ID
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline:", device_id);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error("Initialization error:", message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error("Authentication error:", message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error("Account error:", message);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) return;
        setPlayerState({
          currentTrack: state.track_window.current_track,
          paused: state.paused,
          repeat_mode: state.repeat_mode,
          shuffle: state.shuffle,
        });
      });

      player.connect();
    };

    // Load the Spotify Web Playback SDK script dynamically
    const loadSpotifySDK = () => {
      const existingScript = document.getElementById(
        "spotify-web-playback-sdk"
      );

      if (existingScript) {
        // Script is already in the document
        return;
      }

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.id = "spotify-web-playback";
      script.async = true;

      // Define `window.onSpotifyWebPlaybackSDKReady` before loading the script
      window.onSpotifyWebPlaybackSDKReady = initializePlayer;

      document.body.appendChild(script);

      // Cleanup script when component unmounts
      return () => {
        document.body.removeChild(script);
        window.onSpotifyWebPlaybackSDKReady = null;
      };
    };

    loadSpotifySDK();
  }, [accessToken, setDeviceId, setPlayerState]);

  return null; // This component does not render anything
}

export default PlayBack;
