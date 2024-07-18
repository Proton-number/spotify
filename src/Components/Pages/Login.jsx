import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  createTheme,
  ThemeProvider,
  IconButton,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useAuthenticationStore from "../../Store/authStore";
import { useNavigate, Link } from "react-router-dom";


function Login({ IOSSwitch }) {
  const navigate = useNavigate();
  const {
    user,
    error,
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    identifier,
    password,
    setIdentifier,
    setPassword,
  } = useAuthenticationStore();

  const [showPassword, setShowPassword] = useState(true);
  const [createAccount, setCreateAccount] = useState(true);
  const [haveAccount, setHaveAccount] = useState(true);
  const theme = createTheme({
    typography: {
      fontFamily: "Signika, sans-serif",
    },
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });

  return (
    <Stack spacing={5} sx={{}}>
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          width="40px"
        >
          <path
            fill="#ffffff"
            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
          />
        </svg>
        <Typography variant="h4">
          <b>Log in to Spotify</b>
        </Typography>
      </Stack>

      <ThemeProvider theme={theme}>
        <Stack
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          <Stack>
            <Button
              onClick={() => signInWithGoogle(navigate)}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "25px",
                padding: "13px",
                color: "primary",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={5}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 262"
                  width="30px"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                <Typography>
                  {" "}
                  <b>Continue with Google</b>
                </Typography>
              </Stack>
            </Button>
          </Stack>
          <Stack>
            <Button
              onClick={() => signInWithFacebook(navigate)}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "25px",
                padding: "13px",
                color: "primary",
              }}
            >
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={3}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="32px"
                >
                  <path
                    fill="#0a95ff"
                    d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                  />
                </svg>
                <Typography>
                  <b>Continue with Facebook</b>
                </Typography>
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </ThemeProvider>
      <Stack sx={{ alignItems: "center" }}>
        <Box
          sx={{
            height: "1px",
            backgroundColor: "grey",
            width: { xs: "140%", sm: "220%", lg: "60%" },
          }}
        />
      </Stack>
      <Stack spacing={4} sx={{ alignItems: "center" }}>
        <TextField
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          label={
            <Typography variant="body2" sx={{ color: "white" }}>
              Email address or username
            </Typography>
          }
          sx={{
            width: "17%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
          InputProps={{
            inputProps: {
              style: {
                color: "white",
              },
            },
          }}
        />
        <TextField
          label={
            <Typography variant="body2" sx={{ color: "white" }}>
              Password...
            </Typography>
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                {showPassword ? (
                  <IconButton onClick={() => setShowPassword(false)}>
                    {" "}
                    <VisibilityOff sx={{ color: "white" }} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setShowPassword(true)}>
                    <Visibility sx={{ color: "white" }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
            inputProps: {
              style: {
                color: "white",
              },
            },
          }}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>
      <Stack spacing={2} direction="row" sx={{ justifyContent: "center" }}>
        <FormGroup>
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Remember me"
          />
        </FormGroup>
      </Stack>
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        {createAccount ? (
          <Button
            onClick={() =>
              signInWithEmailAndPassword(identifier, password, navigate)
            }
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: "1200px",
              borderRadius: "25px",
              padding: "14px",
              color: "black",
              width: "22%",
              backgroundColor: "hsl(147, 100%, 43%)",
              "&:hover": {
                backgroundColor: "hsl(158, 100%, 34%)",
              },
            }}
          >
            <b> Log in</b>
          </Button>
        ) : (
          <Button
            onClick={() =>
              signUpWithEmailAndPassword(identifier, password, navigate)
            }
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: "1200px",
              borderRadius: "25px",
              padding: "14px",
              color: "black",
              width: "22%",
              backgroundColor: "hsl(147, 100%, 43%)",
              "&:hover": {
                backgroundColor: "hsl(158, 100%, 34%)",
              },
            }}
          >
            <b> Sign Up</b>
          </Button>
        )}
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
          <Link to={"/forgotpassword"} style={{ color: "white" }}>
            <Typography>Forgot your password?</Typography>
          </Link>
          {haveAccount ? (
            <Typography
              onClick={() => {
                setHaveAccount(false);
                setCreateAccount(false);
              }}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Create an account
            </Typography>
          ) : (
            <Typography
              onClick={() => {
                setHaveAccount(true);
                setCreateAccount(true);
              }}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Have an account ?
            </Typography>
          )}
        </Stack>
      </Stack>
      <Stack sx={{ alignItems: "center" }}>
        {" "}
        <Box
          sx={{
            height: "1px",
            backgroundColor: "grey",
            width: { xs: "140%", sm: "220%", lg: "60%" },
          }}
        />
      </Stack>
    </Stack>
  );
}

export default Login;
