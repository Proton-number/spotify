import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import NavMobile from "./Components/NavMobile";
import Home from "./Components/Pages/Home";
import Search from "./Components/Pages/Search";
import Library from "./Components/Pages/Library";
import Login from "./Components/Pages/Login";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import Callback from "./Components/Pages/Callback";

function App() {
  console.log(import.meta.env.VITE_FIREBASE_APP_ID);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <>
      <Router>
        <Nav />
        <NavMobile />
        <Routes>
          <Route exact path="/" element={<Login IOSSwitch={IOSSwitch} />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/library" element={<Library />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
