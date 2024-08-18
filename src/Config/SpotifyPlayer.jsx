import { useEffect } from "react";
import useSpotifyStore from "../Store/SpotifyStore";
const useSpotifyPlayer = () => {
  const { accessToken, setDeviceId } = useSpotifyStore((state) => ({
    accessToken: state.accessToken,
    setDeviceId: state.setDeviceId,
  }));

  useEffect(() => {
    if (window.Spotify && accessToken) {
      const player = new window.Spotify.Player({
        name: "Atom Music",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("player_state_changed", (state) => {
        if (state) {
          console.log(state);
        }
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);

        spotifyApi.transferMyPlayback([device_id]).then(() => {
          console.log("Playback transferred to React app");
        });
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    }
  }, [accessToken, setDeviceId]);
};

export default useSpotifyPlayer;
