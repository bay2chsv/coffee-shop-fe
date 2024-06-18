import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";
import { accessToken, baseAPI, configAuth } from "@/utils/constant";
import axiosInstance from "@/utils/axiosInstance";
import { green } from "@mui/material/colors";
import Swal from "sweetalert2";

export async function getServerSideProps() {
  const res = await fetch(`${baseAPI}/categories?limit=10`);
  const categories = await res.json();

  return { props: { categories } };
}
const defaultTheme = createTheme();
export default function index({ categories }) {
  const [drinks, setDrinks] = useState([]);
  const [option, setOption] = useState(null);
  const axiosgetDrinks = async (category) => {
    let pathAPI = "drinks/all";
    if (category) pathAPI += `?category=${category}`;
    try {
      const { data } = await axiosInstance.get(`${pathAPI}`);
      setDrinks(data.data);
    } catch (e) {}
  };
  useEffect(() => {
    axiosgetDrinks(option);
  }, [option]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Paper sx={{ p: 1 }}>
        <Grid container maxWidth="lg">
          <Container sx={{ justifyContent: "center" }}>
            <Button
              sx={{ mt: "15px", ml: "25px", p: 1, textTransform: "none" }}
              onClick={() => {
                setOption(null);
              }}
              variant="contained"
              color="secondary"
            >
              All drink
            </Button>
            {categories.data && categories.data.length > 0
              ? categories.data.map((category) => (
                  <Button
                    sx={{ mt: "15px", ml: "25px", p: 1, textTransform: "none" }}
                    key={category.id}
                    onClick={() => {
                      setOption(category.name);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    {category.name}
                  </Button>
                ))
              : null}
          </Container>
          <Grid container spacing={1} maxWidth="md">
            {drinks && drinks.length > 0
              ? drinks.map((drink) => (
                  <Grid item key={drink.id} sx={{ mt: 5 }}>
                    <Card sx={{ width: "215px", height: "235px", display: "flex", flexDirection: "column" }}>
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          paddingTop: "70.25%",
                          backgroundSize: "cover", // Ensure the image covers the entire container
                          backgroundPosition: "center", // Center the image
                        }}
                        image={drink.imageUrl}
                      />

                      <CardContent sx={{ flexGrow: 1, textTransform: "none" }}>
                        <Typography variant="inherit">{drink.name}</Typography>
                        <Typography variant="subtitle1"> {drink.price} đồng</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}
