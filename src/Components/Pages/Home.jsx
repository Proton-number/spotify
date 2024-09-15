import React, { useEffect, useCallback } from "react";
import useAuthenticationStore from "../../Store/authStore";
import {
  Stack,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
} from "@mui/material";
import homeStore from "../../Store/homeStore";

function Home() {
  const { user } = useAuthenticationStore();
  const {
    recentlyPlayed,
    setRecentlyPlayed,
    fetchRecentlyPlayed,
    madeForYou,
    setMadeForYou,
    fetchMadeForYou,
  } = homeStore();

  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif",
    },
  });

  useEffect(() => {
    const storedRecentlyPlayed = localStorage.getItem("recentlyPlayed");
    if (storedRecentlyPlayed) {
      setRecentlyPlayed(JSON.parse(storedRecentlyPlayed));
    }

    const storedMadeForYou = localStorage.getItem("madeForYou");
    if (storedMadeForYou) {
      setMadeForYou(JSON.parse(storedMadeForYou));
    }

    fetchRecentlyPlayed();
    fetchMadeForYou();
  }, [fetchRecentlyPlayed, fetchMadeForYou]);

  const memorizedFetchRecentlyPlayed = useCallback(() => {
    fetchRecentlyPlayed();
  }, [fetchRecentlyPlayed]);

  useEffect(() => {
    const interval = setInterval(() => {
      memorizedFetchRecentlyPlayed();
    }, 1000);

    return () => clearInterval(interval);
  }, [memorizedFetchRecentlyPlayed]);

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography
              variant="h4"
              sx={{
                "&:hover": { textDecoration: "underline" },
                cursor: "pointer",
              }}
            >
              Made for {user?.display_name || "Guest"}
            </Typography>
          </ThemeProvider>
        </Box>
        <Grid spacing={1.5} container direction="row">
          {madeForYou.map((made, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              sx={{
                backgroundColor: "transparent",
                padding: "21px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "hsl(0, 0%, 15%)",
                  cursor: "pointer",
                  transition: " padding 0.2s ease-in",
                },
              }}
              key={index}
            >
              <Box
                component="img"
                sx={{
                  width: { xs: "150px", sm: "190px" },
                  height: { xs: "150px", sm: "190px" },
                }}
                src={made.images[0]?.url}
              />
              <Typography>{made.name}</Typography>
              <Box
                sx={{
                  width: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    opacity: "70%",
                  }}
                >
                  {made.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography
              variant="h4"
              sx={{
                "&:hover": { textDecoration: "underline" },
                cursor: "pointer",
              }}
            >
              Recently played
            </Typography>
          </ThemeProvider>
        </Box>
        <Grid spacing={1.5} container direction="row">
          {recentlyPlayed.map((track, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              sx={{
                backgroundColor: "transparent",
                padding: "21px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "hsl(0, 0%, 15%)",
                  cursor: "pointer",
                  transition: " padding 0.2s ease-in",
                },
              }}
              key={index}
            >
              <Box
                component="img"
                src={track?.track?.album?.images?.[0]?.url || ""}
                sx={{
                  width: { xs: "150px", sm: "190px" },
                  height: { xs: "150px", sm: "190px" },
                }}
              />
              <Box
                sx={{
                  width: 150,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: "bold",
                  }}
                >
                  {track?.track?.name}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: "70%" }}>
                {track?.track?.artists[0]?.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default Home;
