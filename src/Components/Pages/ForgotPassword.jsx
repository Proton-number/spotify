import React, { useState } from "react";
import { Typography, Stack, TextField, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuthenticationStore from "../../Store/authStore";

function ForgotPassword() {
  const { email, setEmail, sendPasswordResetEmail, sending } =
    useAuthenticationStore();

  const navigate = useNavigate();

  const handlePasswordReset = () => {
    sendPasswordResetEmail(email, navigate);
  };

  return (
    <Stack
      sx={{
        width: "60%",
        margin: "0 auto",
        textAlign: "left",
        position: "relative",
      }}
      spacing={3}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          position: "fixed",
          top: { sm: 80, lg: 50 },
          left: { sm: 50, lg: 60 },
        }}
        spacing={2}
      >
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
        <Typography variant="h5">
          <b>Spotify</b>
        </Typography>
      </Stack>
      <Typography variant="h4">Reset your password</Typography>
      <Typography variant="body2">
        Enter your email address or username, and we'll send you a link to get
        back into your account.
      </Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        label={
          <Typography variant="body2" sx={{ color: "white" }}>
            Email address or username
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
          inputProps: {
            style: {
              color: "white",
            },
          },
        }}
      />
      <Typography
        sx={{
          textAlign: "left",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Need support?
      </Typography>
      <LoadingButton
        loading={sending}
        onClick={handlePasswordReset}
        variant="contained"
        sx={{
          textTransform: "none",
          fontWeight: "1200px",
          borderRadius: "25px",
          padding: "14px",
          color: "black",
          backgroundColor: "hsl(147, 100%, 43%)",
          "&:hover": {
            backgroundColor: "hsl(158, 100%, 34%)",
          },
          backgroundColor: "hsl(147, 100%, 43%)",
          "&:hover": {
            backgroundColor: "hsl(158, 100%, 34%)",
          },
          "& .MuiLoadingButton-loadingIndicator": {
            color: "hsl(160, 100%, 49%)",
          },
        }}
        disableElevation
      >
        <b> Send Link</b>
      </LoadingButton>
    </Stack>
  );
}

export default ForgotPassword;
