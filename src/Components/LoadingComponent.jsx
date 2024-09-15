import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";
import { bouncyArc } from "ldrs";

bouncyArc.register();

function LoadingComponent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <Box sx={{ height: "100vh" }}>
          <Box
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            component={motion.div}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
            }}
          >
            <l-bouncy-arc
              size="70"
              stroke="4"
              speed="1.5"
              color="white"
            ></l-bouncy-arc>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}

export default LoadingComponent;
