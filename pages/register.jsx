import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { baseAPIAuth } from "@/utils/constant";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function register() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    const fullName = data.get("fullName");
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email is required!",
      });
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password is required!",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }
    if (!fullName) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Full name is required!",
      });
      return;
    }
    const jsonBody = {
      email: email,
      fullName: fullName,
      password: password,
    };
    try {
      const { data } = await axios.post(`${baseAPIAuth}/signup`, jsonBody);
      Swal.fire({
        title: "Success",
        text: `${data.message}`,
        icon: "success",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 700);
    } catch (e) {
      Swal.fire({
        title: "Failed",
        text: `error: ${error.response.data.message}`,
        icon: "error",
      });
    }
  };
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  function validatePassword(password) {
    const minLength = 8;

    return password.length >= minLength;
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="given-name" name="fullName" required fullWidth id="fullName" label="Full Name" autoFocus />
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              {" "}
              <Grid item sx={{ mr: 16 }}>
                <Link href="/" variant="body2">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
