import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, Paper, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import useSpotifyStore from "../Store/SpotifyStore";
function Nav() {
  const [filter, setFilter] = useState("All");
  const {
    likedSongs,
    savedAlbums,
    podcasts,
    artists,
    userPlaylists,
    fetchLikedSongs,
    fetchSavedAlbums,
    fetchSavedPodcasts,
    fetchSavedArtists,
    fetchSavedPlaylists,
    setSavedAlbums,
    setPodcasts,
    setArtists,
    setUserPlaylists,
    accessToken,
  } = useSpotifyStore((state) => ({
    likedSongs: state.likedSongs,
    savedAlbums: state.savedAlbums,
    podcasts: state.podcasts,
    artists: state.artists,
    userPlaylists: state.userPlaylists,
    fetchLikedSongs: state.fetchLikedSongs,
    fetchSavedAlbums: state.fetchSavedAlbums,
    fetchSavedPodcasts: state.fetchSavedPodcasts,
    fetchSavedArtists: state.fetchSavedArtists,
    fetchSavedPlaylists: state.fetchSavedPlaylists,
    setSavedAlbums: state.setSavedAlbums,
    setPodcasts: state.setPodcasts,
    setArtists: state.setArtists,
    setUserPlaylists: state.setUserPlaylists,
    accessToken: state.accessToken,
  }));

  useEffect(() => {
    const storedAlbums = localStorage.getItem("savedAlbums");
    if (storedAlbums) {
      setSavedAlbums(JSON.parse(storedAlbums));
    }

    const storedPodcasts = localStorage.getItem("savedPodcasts");
    if (storedPodcasts) {
      setPodcasts(JSON.parse(storedPodcasts));
    }

    const storedArtists = localStorage.getItem("savedArtist");
    if (storedArtists) {
      setArtists(JSON.parse(storedArtists));
    }

    const storedPlaylists = localStorage.getItem("savedPlaylists");
    if (storedPlaylists) {
      setUserPlaylists(JSON.parse(storedPlaylists));
    }

    if (accessToken) {
      fetchLikedSongs();
      fetchSavedAlbums();
      fetchSavedPodcasts();
      fetchSavedArtists();
      fetchSavedPlaylists();
    }
  }, [
    accessToken,
    fetchLikedSongs,
    fetchSavedAlbums,
    fetchSavedPodcasts,
    fetchSavedArtists,
    fetchSavedPlaylists,
    setSavedAlbums,
    setPodcasts,
  ]);

  const handleFilterClick = (newFilter) => {
    if (filter === newFilter) {
      setFilter("All");
    } else {
      setFilter(newFilter);
    }
  };

  return (
    <Stack spacing={1}>
      <Paper
        sx={{
          padding: "10px",
          color: "white",
          backgroundColor: "hsl(60, 2%, 9%)",
          borderRadius: "12px",
        }}
        elevation={8}
      >
        <Stack spacing={1}>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                color: "white",
              }}
            >
              <HomeIcon />
              <Typography>
                <b>Home</b>
              </Typography>
            </Stack>
          </Link>
          <Link to="/search" style={{ textDecoration: "none" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", color: "white" }}
            >
              <SearchIcon />
              <Typography sx={{}}>
                <b>Search</b>
              </Typography>
            </Stack>
          </Link>
        </Stack>
      </Paper>
      <Paper
        sx={{
          padding: "10px",
          color: "white",
          backgroundColor: "hsl(60, 2%, 9%)",
          borderRadius: "12px",
          height: { lg: "71.5vh" },
        }}
        elevation={8}
      >
        <Stack spacing={1.5} sx={{ height: { lg: "71.5vh" } }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="Svg-sc-ytk21e-0 bneLcE"
                id="SVG 4"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="24px"
              >
                <path
                  fill="white"
                  d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"
                ></path>
              </svg>
              <Typography>
                <b>Your library</b>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <AddIcon />
              <ArrowForwardIcon />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Box
              onClick={() => handleFilterClick("Playlists")}
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
                opacity: filter === "Playlists" ? "100" : "70%",
              }}
            >
              <Typography variant="body2">
                <b>Playlists</b>
              </Typography>
            </Box>
            <Box
              onClick={() => handleFilterClick("Artists")}
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
                opacity: filter === "Artists" ? "100" : "70%",
              }}
            >
              <Typography variant="body2">
                <b>Artists</b>
              </Typography>
            </Box>
            <Box
              onClick={() => handleFilterClick("Albums")}
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
                opacity: filter === "Albums" ? "100" : "70%",
              }}
            >
              <Typography variant="body2">
                <b> Albums</b>
              </Typography>
            </Box>
            <Box
              onClick={() => handleFilterClick("Podcasts")}
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
                opacity: filter === "Podcasts" ? "100" : "70%",
              }}
            >
              <Typography variant="body2">
                {" "}
                <b>Podcasts & Shows</b>
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <SearchIcon />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography variant="subtitle2">Recents</Typography>
              <FormatListBulletedIcon />
            </Stack>
          </Stack>
          <Stack
            sx={{ textAlign: "left", maxHeight: "550px", overflowY: "auto" }}
            spacing={2}
          >
            {(filter === "All" || filter === "Albums") &&
            savedAlbums &&
            savedAlbums.length > 0 ? (
              savedAlbums.map((album) => (
                <Stack
                  direction="row"
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  key={album.album.id}
                  spacing={2}
                >
                  <Box
                    loading="lazy"
                    component="img"
                    src={album.album.images[0].url}
                    alt={album.album.name}
                    sx={{ width: { lg: "60px" }, borderRadius: "10px" }}
                  />
                  <Stack>
                    <Typography variant="body2">
                      {" "}
                      <b>{album.album.name}</b>
                    </Typography>
                    <Typography variant="subtitle2" fontSize=".78rem">
                      {" "}
                      Album . {album.album.artists[0].name}
                    </Typography>
                  </Stack>
                </Stack>
              ))
            ) : filter === "Albums" ? (
              <li>Loading...</li>
            ) : null}

            {(filter === "All" || filter === "Podcasts") &&
            podcasts &&
            podcasts.length > 0 ? (
              podcasts.map((podcast) => (
                <Stack
                  key={podcast.show.id}
                  direction="row"
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  spacing={2}
                >
                  <Box
                    loading="lazy"
                    component="img"
                    src={podcast.show.images[0].url}
                    sx={{ width: { lg: "60px" } }}
                    alt={podcast.show.name}
                  />
                  <Stack>
                    <Typography variant="body2">
                      <b>{podcast.show.name}</b>
                    </Typography>
                    <Typography variant="subtitle2" fontSize=".78rem">
                      {" "}
                      Podcast .{podcast.show.publisher}
                    </Typography>
                  </Stack>
                </Stack>
              ))
            ) : filter === "Podcasts" ? (
              <li>Loading...</li>
            ) : null}

            {(filter === "All" || filter === "Artists") &&
            artists &&
            artists.length > 0 ? (
              artists.map((artist) => (
                <Stack
                  key={artist.id}
                  direction="row"
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  alt={artist.name}
                  spacing={2}
                >
                  <Box
                    loading="lazy"
                    component="img"
                    src={artist.images[0].url}
                    sx={{ width: { lg: "60px" }, borderRadius: "50%" }}
                  />
                  <Typography variant="body2">
                    <b>{artist.name}</b>
                  </Typography>
                </Stack>
              ))
            ) : filter === "Artists" ? (
              <li>Loading...</li>
            ) : null}

            {(filter === "All" || filter === "Playlists") &&
            userPlaylists &&
            userPlaylists.length > 0 ? (
              userPlaylists.map((playlist) => (
                <Stack
                  key={playlist.id}
                  direction="row"
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  spacing={2}
                >
                  <Box
                    loading="lazy"
                    component="img"
                    src={playlist.images[0].url}
                    sx={{ width: { lg: "60px" } }}
                  />
                  <Typography variant="body2">
                    <b>{playlist.name}</b>
                  </Typography>
                </Stack>
              ))
            ) : filter === "Playlists" ? (
              <li>Loading...</li>
            ) : null}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default Nav;
