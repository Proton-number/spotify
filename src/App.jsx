import { lazy, useEffect, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./Components/Pages/Home"));
const Search = lazy(() => import("./Components/Pages/Search"));
import Library from "./Components/Pages/Library";
const Login = lazy(() => import("./Components/Pages/Login"));
const ForgotPassword = lazy(() => import("./Components/Pages/ForgotPassword"));
import Callback from "./Components/Pages/Callback";
import Layout from "./Components/Layout";
import useAuthenticationStore from "./Store/authStore";
import useSpotifyPlayer from "./Config/SpotifyPlayer";
import LoadingComponent from "./Components/LoadingComponent";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

function App() {
  useSpotifyPlayer();

  const setUser = useAuthenticationStore((state) => state.setUser);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  return (
    <>
      <LoadingComponent />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense fallback={null}>
                <Box
                  component={motion.div}
                  initial={{ display: "none" }}
                  animate={{ display: "block" }}
                  transition={{ delay: 3.48, ease: "anticipate" }}
                >
                  <Login />
                </Box>
              </Suspense>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <Layout>
                <Suspense fallback={null}>
                  <Home />
                </Suspense>
              </Layout>
            }
          />
          <Route
            exact
            path="/search"
            element={
              <Layout>
                <Suspense fallback={null}>
                  <Search />
                </Suspense>
              </Layout>
            }
          />
          <Route exact path="/library" element={<Library />} />
          <Route
            exact
            path="/forgotpassword"
            element={
              <Suspense fallback={null}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            exact
            path="/callback"
            element={
              <Layout>
                <Callback />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
