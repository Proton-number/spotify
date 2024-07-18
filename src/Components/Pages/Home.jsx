import React, { useEffect } from "react";
import useAuthenticationStore from "../../Store/authStore";
import {
  Stack,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
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
      setRecentlyPlayed(JSON.parse(storedMadeForYou));
    }

    fetchRecentlyPlayed();
    fetchMadeForYou();
  }, [fetchRecentlyPlayed, fetchMadeForYou]);

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Box
          sx={{
            width: "fit-content",
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
        <Stack
          spacing={1}
          sx={{
            width: "fit-content",
          }}
          direction="row"
        >
          {madeForYou.map((made, index) => (
            <Box
              sx={{
                "&:hover": {
                  backgroundColor: "grey",
                  padding: "10px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  transition: " padding 0.2s ease-in",
                },
              }}
              key={index}
            >
              <Box
                sx={{
                  backgroundColor: "lightblue",
                  width: "150px",
                  height: "150px",
                }}
              />
              {/* <Typography>{made.name}</Typography> */}
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
                  }}
                >
                  Drake Doja Cat, Adele and more
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Box
          sx={{
            width: "fit-content",
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
        <Stack
          spacing={1}
          sx={{
            width: "fit-content",
          }}
          direction="row"
        >
          {recentlyPlayed.map((track, index) => (
            <Box
              sx={{
                "&:hover": {
                  backgroundColor: "grey",
                  borderRadius: "25px",
                  padding: "10px",
                  borderRadius: "3px",
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
                  width: "150px",
                  height: "150px",
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
                  }}
                >
                  {track.track.name}
                </Typography>
              </Box>
              <Typography variant="body2">
                {track.track.artists[0].name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Box
          sx={{
            width: "fit-content",
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
              Uniquely yours
            </Typography>
          </ThemeProvider>
        </Box>
        <Stack
          spacing={1}
          sx={{
            width: "fit-content",
          }}
        >
          <Box
            sx={{
              "&:hover": {
                backgroundColor: "grey",
                padding: "10px",
                borderRadius: "3px",
                cursor: "pointer",
                transition: " padding 0.2s ease-in",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "lightgreen",
                width: "150px",
                height: "150px",
              }}
            />
            <Typography variant="body2">daylist • sensuaL</Typography>
            <Typography variant="body2">you listen to...</Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Home;
