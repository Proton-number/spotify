import { Box, Stack, Typography, IconButton, Slider } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";

function Player() {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-around" }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Box
          sx={{ width: "60px", height: "60px", backgroundColor: "lightgreen" }}
        />
        <Stack spacing={1}>
          <Typography>Song name</Typography>
          <Typography>Artist</Typography>
        </Stack>
        <IconButton>
          <FavoriteIcon sx={{ color: "lightgreen" }} fontSize="large" />
        </IconButton>
      </Stack>
      <Stack>
        <Stack direction="row">
          <IconButton>
            <ShuffleIcon sx={{ color: "lightgreen" }} fontSize="large" />
          </IconButton>
          <IconButton>
            <SkipPreviousIcon sx={{ color: "lightgreen" }} fontSize="large" />
          </IconButton>
          <IconButton>
            <PlayCircleIcon sx={{ color: "lightgreen" }} fontSize="large" />
          </IconButton>
          <IconButton>
            <SkipNextIcon sx={{ color: "lightgreen" }} fontSize="large" />
          </IconButton>
          <IconButton>
            <RepeatIcon sx={{ color: "lightgreen" }} fontSize="large" />
          </IconButton>
        </Stack>
        {/* progressbar */}
        <Slider
          min={0}
          step={1}
          sx={{
            flexGrow: 1,
            color: "white",
              height: 4,
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              backgroundColor: "#fff",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 7px`,
              },
              "&.Mui-active": {
                width: 12,
                height: 12,
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              opacity: 0.38,
              fontWeight: 500,
              letterSpacing: 0.2,
            }}
          >
            1:20
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              opacity: 0.38,
              fontWeight: 500,
              letterSpacing: 0.2,
            }}
          >
            - 2:40
          </Typography>
        </Box>
      </Stack>

      <Stack direction="column" sx={{ width: "150px" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <VolumeDownRounded />
          <Slider
            sx={{
              mx: 1,
              color: "rgba(255, 255, 255, 0.38)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 12,
                height: 12,
                backgroundColor: "#fff",
                "&::before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded />
        </Box>
      </Stack>
    </Stack>
  );
}

export default Player;
