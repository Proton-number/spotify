import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, Paper, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import useSpotifyStore from "../Store/SpotifyStore";
function Nav() {
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
        }}
        elevation={8}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <LibraryMusicIcon />
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
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Typography variant="body2">
                <b>Playlists</b>
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Typography variant="body2">
                <b>Artists</b>
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Typography variant="body2">
                <b> Albums</b>
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
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
            {savedAlbums && savedAlbums.length > 0 ? (
              savedAlbums.map((album) => (
                <Stack
                  direction="row"
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  key={album.album.id}
                  spacing={2}
                >
                  <Box
                    component="img"
                    src={album.album.images[0].url}
                    alt={album.album.name}
                    sx={{ width: { lg: "60px" } }}
                  />
                  <Stack>
                    <Typography variant="body2">
                      {" "}
                      <b>{album.album.name}</b>
                    </Typography>
                    <Typography> {album.album.artists[0].name}</Typography>
                  </Stack>
                </Stack>
              ))
            ) : (
              <li>Loading...</li>
            )}

            {podcasts && podcasts.length > 0 ? (
              podcasts.map((podcast) => (
                <Stack
                  key={podcast.show.id}
                  direction="row"
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  spacing={2}
                >
                  <Box
                    component="img"
                    src={podcast.show.images[0].url}
                    sx={{ width: { lg: "60px" } }}
                    alt={podcast.show.name}
                  />
                  <Stack>
                    <Typography variant="body2">
                      <b>{podcast.show.name}</b>
                    </Typography>
                    <Typography>{podcast.show.publisher}</Typography>
                  </Stack>
                </Stack>
              ))
            ) : (
              <li>Loading...</li>
            )}

            {artists && artists.length > 0 ? (
              artists.map((artist) => (
                <Stack
                  key={artist.id}
                  direction="row"
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  alt={artist.name}
                  spacing={2}
                >
                  <Box
                    component="img"
                    src={artist.images[0].url}
                    sx={{ width: { lg: "60px" } }}
                  />
                  <Typography variant="body2">
                    <b>{artist.name}</b>
                  </Typography>
                </Stack>
              ))
            ) : (
              <li>Loading...</li>
            )}

            {userPlaylists && userPlaylists.length > 0 ? (
              userPlaylists.map((playlist) => (
                <Stack
                  key={playlist.id}
                  direction="row"
                  sx={{ alignItems: "center", cursor: "pointer" }}
                  spacing={2}
                >
                  <Box
                    component="img"
                    src={playlist.images[0].url}
                    sx={{ width: { lg: "60px" } }}
                  />
                  <Typography variant="body2">
                    <b>{playlist.name}</b>
                  </Typography>
                </Stack>
              ))
            ) : (
              <li>Loading...</li>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default Nav;
