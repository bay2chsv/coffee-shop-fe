import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { Autocomplete } from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";

function DrinkForm({ drink, category, handleSubmit, handleCategoryChange, handleChange, text, categories }) {
  const router = useRouter();
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
          {text} drink
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            Name:
          </Grid>
          <Grid item xs={9}>
            <TextField autoComplete="given-name" name="name" required fullWidth id="name" value={drink.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={3}>
            Price:
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              fullWidth
              id="price"
              type="number"
              name="price"
              autoComplete="price"
              value={drink.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            Category:
          </Grid>
          <Grid item xs={9}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={category}
              options={categories}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Categories" />}
              onChange={handleCategoryChange}
            />
          </Grid>
          <Grid item xs={3}>
            Image:
          </Grid>
          <Grid item xs={9}>
            <Button variant="contained" sx={{ textTransform: "none" }} component="label">
              Select image
              <input hidden accept="image/*" name="image" onChange={handleChange} multiple type="file" />
            </Button>
          </Grid>
          <Grid item xs={12}>
            {drink.imageUrl && <img src={drink.imageUrl} alt="Selected produce" style={{ maxWidth: "75%", maxHeight: "200px" }} />}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", mt: 3, mb: 2 }}>
          {" "}
          <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ mr: 5 }}>
            {text}
            {/* create or update */}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => router.back()}
            sx={{ background: red[400], ":hover": { background: red[600] } }}
          >
            Back
            {/* create or update */}
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default DrinkForm;
