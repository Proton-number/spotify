import React from "react";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import { useLocation } from "react-router-dom";
import { Stack, Box, Paper } from "@mui/material";
import TopNav from "./TopNav";
import Player from "./Player";
import { motion } from "framer-motion";

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && (
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Box
              sx={{
                width: { xs: "34%", sm: "28%" },
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
                marginLeft: { xs: "38%", sm: "30%" },
                display: "flex",
                flexDirection: "column",
                width: { xs: "63%", sm: "72%" },
                overflowY: "auto",
                paddingBottom: "70px",
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
                    width: { xs: "58%", sm: "68%" },
                  }}
                >
                  <TopNav />
                </Box>

                <Box
                  sx={{
                    marginTop: "80px",
                    padding: "16px",
                    marginBottom: { xs: "100px", sm: "20px" },
                  }}
                >
                  {children}
                </Box>
              </Paper>
            </Box>
          </Box>

          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              backgroundColor: "hsl(0, 0%, 0%)",
              padding: "5px",
              zIndex: 3,
            }}
          >
            <Player />
          </Box>
        </Box>
      )}
      {!isLoginPage && <NavMobile />}
    </>
  );
}

export default Layout;
