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
    // uniquely,
    // setUniquely,
    // fetchUniquely,
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

    // const storedUniquely = localStorage.getItem("Uniquely");
    // if (storedUniquely) {
    //   setUniquely(JSON.parse(storedUniquely));
    // }

    fetchRecentlyPlayed();
    fetchMadeForYou();
    // fetchUniquely();
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
                backgroundColor: "transparent",
                padding: "10px",
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
                  width: "150px",
                  height: "150px",
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
                  }}
                >
                  {made.description}
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
                backgroundColor: "transparent",
                padding: "10px",
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
                  {track?.track?.name}
                </Typography>
              </Box>
              <Typography variant="body2">
                {track?.track?.artists[0]?.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Stack
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
        </Stack>
        <Stack
          spacing={1}
          sx={{
            width: "fit-content",
          }}
          direction="row"
        >
          {/* {uniquely.map((unique, index) => (
            <Box
               sx={{
                backgroundColor: "transparent",
                padding: "10px",
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
                  width: "150px",
                  height: "150px",
                }}
                src={unique.images[0]?.url}
              />
              <Typography variant="body2">daylist • sensuaL</Typography>
              <Typography variant="body2">you listen to...</Typography>
            </Box>
          ))} */}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Home;
