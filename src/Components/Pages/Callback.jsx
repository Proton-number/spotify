import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthenticationStore from "../../Store/authStore";
import useSpotifyStore from "../../Store/SpotifyStore";

const Callback = () => {
  const navigate = useNavigate();
  const setUser = useAuthenticationStore((state) => state.setUser);
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      setAccessToken(accessToken);
      // Fetch user info from Spotify API
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [navigate, setUser, setAccessToken]);

  return <div>Loading...</div>;
};

export default Callback;
