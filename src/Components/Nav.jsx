import React from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, Paper, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
function Nav() {
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

          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Box
              sx={{
                backgroundColor: "hsl(0, 0%, 15%)",
                borderRadius: "60px",
                padding: "8px",
                alignItems: "center",
                display: "flex",
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
        </Stack>
      </Paper>
    </Stack>
  );
}

export default Nav;
