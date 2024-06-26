import React from "react";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import { useLocation } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import TopNav from "./TopNav";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  return (
    <>
      {!isLoginPage && (
        <Stack
          direction="row"
          sx={{
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
          }}
          spacing={4}
        >
          <Box sx={{ width: "26%", backgroundColor: "hsl(0, 0%, 5%)" }}>
            <Nav />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <TopNav />
          </Box>
        </Stack>
      )}
      {!isLoginPage && <NavMobile />}
    </>
  );
}

export default Layout;
