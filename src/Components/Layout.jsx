import React from "react";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import { useLocation } from "react-router-dom";
import { Stack, Box, Paper } from "@mui/material";
import TopNav from "./TopNav";
import Player from "./Player";

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && (
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              backgroundColor: "hsl(0, 0%, 0%)",
              padding: "30px",
              zIndex: 3,
            }}
          >
            <Player />
          </Box>
          <Box
            sx={{
              width: "28%",
              position: "fixed",
              top: 14,
              left: 12,
              zIndex: 2,
            }}
          >
            <Nav />
          </Box>

          <Box
            sx={{
              marginLeft: "30%", // Adjust this according to the width of the Nav
              display: "flex",
              flexDirection: "column",
              width: "72%",
              overflowY: "auto",
            }}
          >
            <Paper
              sx={{
                backgroundColor: "hsl(0, 0%, 9%)",
                color: "white",
                marginTop: "16px",
                padding: "10px",
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  top: 18,
                  width: "68%", // Same as the main content width
                }}
              >
                <TopNav />
              </Box>

              <Box
                sx={{
                  marginTop: "80px",
                  padding: "16px",
                }}
              >
                {children}
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
      {!isLoginPage && <NavMobile />}
    </>
  );
}

export default Layout;
