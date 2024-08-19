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
      sx={{ alignItems: "center", justifyContent: "space-around" }}
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

        <Stack sx={{ width: "300px" }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {currentSong ? currentSong.name : "Song name"}
            </Typography>
          </Box>
          <Typography variant="subtitle2" sx={{ opacity: "70%" }}>
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
      <Stack>
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
        <Box>
          <Slider
            value={position}
            max={duration}
            onChange={handleSeek}
            sx={{
              width: {
                lg: 600,
              },

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
        </Box>
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
    </Stack>
  );
}

export default Player;
