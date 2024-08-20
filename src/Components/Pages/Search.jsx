import React, { useEffect, useState } from "react";
import { Stack, Typography, Box, Grid } from "@mui/material";
import searchStore from "../../Store/searchStore";
import { treadmill } from "ldrs";

function Search() {
  const {
    categories,
    setCategories,
    searchResults,
    fetchCategories,
    inputValue,
  } = searchStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
      setLoading(false); // Stop loading if categories are already stored
    } else {
      fetchCategories().then(() => setLoading(false)); // Stop loading after fetching categories
    }
  }, [fetchCategories, setCategories]);

  treadmill.register();

  const displayCategories = !inputValue || searchResults.length === 0;

  return (
    <Stack spacing={1} sx={{ height: "100vh", overflow: "hidden" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {displayCategories ? "Browse all" : "Search Results"}
      </Typography>

      {loading ? (
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <l-treadmill size="70" speed="1.25" color="white"></l-treadmill>
        </Stack>
      ) : displayCategories ? (
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <Box
                component="img"
                src={category.icons[0].url}
                alt={category.name}
                sx={{ width: "100%", borderRadius: 2, cursor: "pointer" }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {category.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={2}>
            {searchResults.tracks.items.map((track) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={track.id}>
                <Box
                  component="img"
                  src={track.album.images[0]?.url || "/placeholder.jpg"} // Fallback if no image
                  alt={track.name}
                  sx={{ width: "100%", borderRadius: 2, cursor: "pointer" }}
                />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {track.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
}

export default Search;
