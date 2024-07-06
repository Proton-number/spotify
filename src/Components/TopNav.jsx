import { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Avatar,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import useAuthenticationStore from "../Store/authStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function TopNav() {
  const navigate = useNavigate();
  const user = useAuthenticationStore((state) => state.user);
  const setUser = useAuthenticationStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { signOutHandler } = useAuthenticationStore((state) => ({
    signOutHandler: state.signOutHandler,
  }));
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
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
              backgroundColor: "hsl(0, 0%, 15%)",
              borderRadius: "50%",
              justifyContent: "center",
              padding: "5px",
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
              backgroundColor: "hsl(0, 0%, 15%)",
              borderRadius: "50%",
              justifyContent: "center",
              padding: "5px",
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
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
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
