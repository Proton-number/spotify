import React, { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  TextField,
  Paper,
  createTheme,
  ThemeProvider,
  Alert,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  return (
    <Stack
      sx={{
        width: "60%",
        margin: "0 auto",
        textAlign: "left",
      }}
      spacing={3}
    >
      <Typography variant="h4">Reset your password</Typography>
      <Typography variant="body2">
        Enter your email address or username, and we'll send you a link to get
        back into your account.
      </Typography>
      <TextField
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
      <Button
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
        }}
      >
        <b> Send Link</b>
      </Button>
    </Stack>
  );
}

export default ForgotPassword;
