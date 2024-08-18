import { Box, Stack, Typography, IconButton, Slider } from "@mui/material";
import React, { useEffect, useCallback } from "react";
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
import PlayerStore from "../Store/playerStore";
import { motion } from "framer-motion";
import useSpotifyStore from "../Store/SpotifyStore";

function Player() {
  const {
    shuffle,
    toggleShuffle,
    isPlayed,
    isFavourite,
    repeat,
    toggleRepeat,
    currentSong,
    setCurrentSong,
    fetchCurrentSong,
    pauseCurrentSong,
    playCurrentSong,
    checkIfLiked,
    likeCurrentSong,
    unlikeCurrentSong,
    previousSong,
    nextSong,
    position,
    duration,
    fetchCurrentPlaybackState,
    seekPosition,
  } = PlayerStore();

  useEffect(() => {
    // Fetch and update playback state every second
    const interval = setInterval(() => {
      fetchCurrentPlaybackState();
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchCurrentPlaybackState]);

  const handleSeek = (event, newValue) => {
    seekPosition(newValue);
  };
  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000); // Convert milliseconds to seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  useEffect(() => {
    if (currentSong) {
      checkIfLiked(currentSong.id);
    }
  }, [currentSong, checkIfLiked]);

  useEffect(() => {
    const storedCurrentSong = localStorage.getItem("currentSong");
    if (storedCurrentSong) {
      setCurrentSong(JSON.parse(storedCurrentSong));
    }
    fetchCurrentSong();
  }, [fetchCurrentSong]);

  const memorizedFetchCurrentSong = useCallback(() => {
    fetchCurrentSong();
  }, [fetchCurrentSong]);

  useEffect(() => {
    const interval = setInterval(() => {
      memorizedFetchCurrentSong();
    }, 1000);

    return () => clearInterval(interval);
  }, [memorizedFetchCurrentSong]);

  const handleLikeToggle = async () => {
    if (isFavourite) {
      await unlikeCurrentSong();
    } else {
      await likeCurrentSong();
    }
    fetchCurrentSong();
  };

  const handlePlayPause = async () => {
    if (isPlayed) {
      await playCurrentSong();
    } else {
      await pauseCurrentSong();
    }
  };

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-evenly" }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        {currentSong && currentSong.album && currentSong.album.images && (
          <Box
            component="img"
            sx={{ width: "60px", height: "60px" }}
            src={currentSong.album.images[0].url || ""}
            alt={currentSong.name}
          />
        )}

        <Stack>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>
              {currentSong ? currentSong.name : "Song name"}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: "70%" }}>
            {currentSong ? currentSong.artists[0].name : "Artist"}
          </Typography>
        </Stack>
        <IconButton onClick={handleLikeToggle}>
          {isFavourite ? (
            <FavoriteIcon sx={{ color: "lightgreen" }} fontSize="medium" />
          ) : (
            <FavoriteBorderOutlinedIcon
              sx={{ color: "lightgreen" }}
              fontSize="medium"
            />
          )}
        </IconButton>
      </Stack>
      <Stack sx={{ flex: 0.9, mx: 25 }}>
        <Stack direction="row" justifyContent="center">
          <IconButton onClick={toggleShuffle}>
            <ShuffleIcon
              sx={{
                color: shuffle ? "lightgreen" : "white",
                opacity: 0.7,
                "&:hover": { opacity: 1 },
              }}
              fontSize="medium"
            />
          </IconButton>

          <IconButton onClick={previousSong}>
            <SkipPreviousIcon
              sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1 } }}
              fontSize="large"
            />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlayed ? (
              <PlayCircleIcon sx={{ color: "white" }} fontSize="large" />
            ) : (
              <PauseCircleIcon sx={{ color: "white" }} fontSize="large" />
            )}
          </IconButton>
          <IconButton onClick={nextSong}>
            <SkipNextIcon
              sx={{ color: "white", opacity: 0.7, "&:hover": { opacity: 1 } }}
              fontSize="large"
            />
          </IconButton>
          <IconButton onClick={toggleRepeat}>
            <RepeatIcon
              sx={{
                color: repeat === "off" ? "white" : "lightgreen",
                opacity: 0.7,
                "&:hover": { opacity: 1 },
              }}
              fontSize="medium"
            />
          </IconButton>
        </Stack>
        {/* progressbar */}
        <Slider
          value={position}
          max={duration}
          onChange={handleSeek}
          sx={{
            color: "white",
            height: 4,
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 12,
              height: 12,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              backgroundColor: "#fff",
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
            {formatTime(position)}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              opacity: 0.38,
              fontWeight: 500,
              letterSpacing: 0.2,
            }}
          >
            {formatTime(duration)}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
        {/* Mic svg */}
        <motion.svg
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="Svg-sc-ytk21e-0 dYnaPI"
          id="SVG 20"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="20px"
        >
          <path
            fill="white"
            d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z"
          ></path>
        </motion.svg>
        <motion.svg
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="Svg-sc-ytk21e-0 dYnaPI"
          id="SVG 24"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="20px"
        >
          <path
            fill="white"
            d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"
          ></path>
        </motion.svg>

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
    </Stack>
  );
}

export default Player;
