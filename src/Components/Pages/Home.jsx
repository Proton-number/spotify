import React from "react";
import useAuthenticationStore from "../../Store/authStore";
import {
  Stack,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";

function Home() {
  const { user } = useAuthenticationStore();

  const theme = createTheme({
    typography: {
      fontFamily: "Kanit, sans-serif", // Specify your font family
    },
  });

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
                backgroundColor: "lightblue",
                width: "150px",
                height: "150px",
              }}
            />
            <Typography>Daily Mix 1</Typography>
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
        >
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
          >
            <Box
              sx={{
                backgroundColor: "pink",
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
                  whiteSpace: "nowrap", // Ensure text doesn't wrap to the next line
                }}
              >
                HIT ME HARD AND SOFT
              </Typography>
            </Box>
            <Typography variant="body2">by Dacron</Typography>
          </Box>
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
