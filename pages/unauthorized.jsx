import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

const containerStyle = {
  height: "100vh",
  backgroundColor: "black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const textStyle = {
  color: "white",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  fontSize: "3rem",
  textAlign: "center",
};

const unauthorized = () => {
  return (
    <Grid container style={containerStyle}>
      <CircularProgress color="secondary" />
      <Grid item>
        <Typography variant="h3" style={textStyle}>
          403 Unauthorized
        </Typography>
      </Grid>
    </Grid>
  );
};

export default unauthorized;
