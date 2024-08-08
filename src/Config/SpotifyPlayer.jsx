import React, { useEffect } from "react";
import useSpotifyStore from "../Store/SpotifyStore";

function SpotifyPlayer() {
  const { accessToken } = useSpotifyStore();
  useEffect(() => {
    if (!accessToken) return;
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });
      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      //listeners to get notified in case something happens during the SDK initialization
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
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
  }, [accessToken, setPlayerState, setDeviceId]);
}

export default SpotifyPlayer;
