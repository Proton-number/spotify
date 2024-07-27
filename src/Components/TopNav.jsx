import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Avatar,
  IconButton,
  Popover,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import useAuthenticationStore from "../Store/authStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import searchStore from "../Store/searchStore";

function TopNav() {
  const navigate = useNavigate();
  const user = useAuthenticationStore((state) => state.user);
  const setUser = useAuthenticationStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { signOutHandler } = useAuthenticationStore((state) => ({
    signOutHandler: state.signOutHandler,
  }));

  const { inputValue, setInputValue } = searchStore();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, [setUser]);

  if (loading) {
    return;
  }

  if (!user) {
    return null;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const handleSignOut = () => {
    signOutHandler(navigate);
  };

  const location = useLocation();

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack direction="row" sx={{ alignItems: "center" }} spacing={3}>
        <Link to="#" onClick={handleGoBack} style={{ color: "white" }}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "hsl(0, 0%, 4%)",
              borderRadius: "50%",
              justifyContent: "center",
              padding: "3px",
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{
                fontSize: 30,
                cursor: "pointer",
              }}
            />
          </Box>
        </Link>
        <Link to="#" onClick={handleForward} style={{ color: "white" }}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "hsl(0, 0%, 4%)",
              borderRadius: "50%",
              justifyContent: "center",
              padding: "3px",
            }}
          >
            <KeyboardArrowRightIcon
              sx={{
                fontSize: 30,
                cursor: "pointer",
              }}
            />
          </Box>
        </Link>
        {location.pathname === "/home" ? null : (
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {inputValue !== "" ? (
                    <ClearIcon
                      sx={{ color: "white", cursor: "pointer" }}
                      onClick={() => setInputValue("")}
                    />
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
            placeholder="What do you want to play?"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "hsl(0, 0%, 16%)",
                borderRadius: "25px",
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
              },
              width: { lg: "50ch" },
            }}
          />
        )}
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "hsl(0, 0%, 15%)",
            borderRadius: "50%",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <NotificationsOutlinedIcon />
        </Box>
        <IconButton onClick={handlePopoverOpen}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "hsl(0, 0%, 15%)",
              borderRadius: "50%",
              justifyContent: "center",
              padding: "5px",
            }}
          >
            <Avatar src={user?.images?.[0]?.url || ""} />
          </Box>
        </IconButton>
        <Popover
          anchorEl={anchorEl}
          open={isPopoverOpen}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            "& .MuiPopover-paper": {
              backgroundColor: "hsl(0, 0%, 15%)",
              color: "white",
              padding: "12px",
              cursor: "pointer",
              borderRadius: "12px",
            },
          }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "center" }}
            spacing={1.2}
            onClick={handleSignOut}
          >
            <ExitToAppIcon />
            <Typography variant="body2">Sign Out</Typography>
          </Stack>
        </Popover>
      </Stack>
    </Stack>
  );
}

export default TopNav;
