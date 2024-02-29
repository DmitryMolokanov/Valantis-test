import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "50px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
