import React, { useEffect } from "react";
import { Stack, Typography, Box, Grid } from "@mui/material";
import searchStore from "../../Store/searchStore";
import { treadmill } from "ldrs";

function Search() {
  const { categories, setCategories, fetchCategories } = searchStore();

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }

    fetchCategories();
  }, [fetchCategories]);

  treadmill.register();

  return (
    <Stack spacing={1}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Browse all
      </Typography>

      {categories ? (
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
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <l-treadmill size="70" speed="1.25" color="white"></l-treadmill>
        </Stack>
      )}
    </Stack>
  );
}

export default Search;
