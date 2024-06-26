import { Stack, Box } from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useNavigate } from "react-router-dom";
import useAuthenticationStore from "../Store/authStore";

function TopNav() {
  const { user } = useAuthenticationStore();
  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack direction="row" sx={{ alignItems: "center" }} spacing={3}>
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
        <Box
          sx={{
            display: "flex",
            backgroundColor: "hsl(0, 0%, 15%)",
            borderRadius: "50%",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <Box
            component="img"
            src={user.images[0].url}
            sx={{ borderRadius: "50%" }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default TopNav;
