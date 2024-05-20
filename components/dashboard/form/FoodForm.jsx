import Dashboard from "@/components/dashboard/Dashboard";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import CoffeeIcon from "@mui/icons-material/Coffee";

function FoodForm({ item, handleSubmit, text }) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CoffeeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Menu
        </Typography>
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="food_name"
                required
                fullWidth
                id="food_name"
                label="Produce Name"
                autoFocus
                value={item.food_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="price" label="Price " type="number" name="price" autoComplete="price" value={item.price} />
            </Grid>
            <Grid item xs={8}>
              {" "}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">category</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="category" value={item.category_id}>
                    <MenuItem value={2}>COFFEE</MenuItem>
                    <MenuItem value={3}>FRUIT TEA</MenuItem>
                    <MenuItem value={1}>MILK TEA</MenuItem>
                    <MenuItem value={4}>SODA</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Add Picture
                <input hidden accept="image/*" name="image" multiple type="file" />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <img src={``} alt="Selected produce" style={{ maxWidth: "75%" }} />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {text}
            {/* create or update */}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default FoodForm;
