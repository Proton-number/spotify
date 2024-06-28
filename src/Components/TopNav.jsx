import { useEffect, useState } from "react";
import { Stack, Box, Avatar, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import useAuthenticationStore from "../Store/authStore";
import { Link, useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();
  const user = useAuthenticationStore((state) => state.user);
  const setUser = useAuthenticationStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

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
    return null; // Or a different placeholder if no user is found
  }

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleForward = () => {
    navigate(1);
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
            <KeyboardArrowLeftIcon sx={{ fontSize: 30, cursor: "pointer" }} />
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
            <KeyboardArrowRightIcon sx={{ fontSize: 30 }} />
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
        <IconButton>
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
      </Stack>
    </Stack>
  );
}

export default TopNav;
