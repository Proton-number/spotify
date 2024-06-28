import React from "react";
import Nav from "./Nav";
import NavMobile from "./NavMobile";
import { useLocation } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import TopNav from "./TopNav";

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && (
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box
            sx={{
              width: "28%",
              height: "100vh",
              position: "fixed",
              top: 14,
              left: 12,
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
                marginTop: "60px",
                padding: "16px",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      )}
      {!isLoginPage && <NavMobile />}
    </>
  );
}

export default Layout;
