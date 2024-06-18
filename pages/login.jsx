import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { useState } from "react";
import { accessToken, baseAPIAuth, getRole } from "@/utils/constant";
import { roleConfig } from "@/utils/config";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!validateEmail(email)) {
      Swal.fire({
        title: "Failed",
        text: `Invalid email`,
        icon: "warning",
      });
      return;
    }
    if (!validatePassword(password)) {
      Swal.fire({
        title: "Failed",
        text: `Password must include at least 8 character`,
        icon: "warning",
      });
      return;
    }
    try {
      const { data } = await axios.post(`${baseAPIAuth}/signin`, {
        email: email,
        password: password,
      });
      const token = data.data.accessToken;

      Cookies.set("accessToken", token);
      Swal.fire({
        title: "Success",
        text: `${data.message}`,
        icon: "success",
      });
      router.reload();
    } catch (error) {
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isLogin = async () => {
    if (accessToken) {
      const role = await getRole(accessToken);
      if (role) {
        if (role === roleConfig.ADMIN) window.location.href = "/admin";
        if (role === roleConfig.EMPLOYEE) window.location.href = "/employee";
        if (role === roleConfig.MANAGER) window.location.href = "/manager";
        if (role === roleConfig.USER) window.location.href = "/";
      }
    }
  };

  const defaultTheme = createTheme();
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography component="h1" variant="h5">
              Welcome to Bay's coffee shop
            </Typography>
            <Avatar src="/2.png" sx={{ m: 2, height: 80, width: 80, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" onClick={handleShowPassword} />}
                label="Show password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {" "}
                  <Link href="/" variant="body2">
                    Home
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
