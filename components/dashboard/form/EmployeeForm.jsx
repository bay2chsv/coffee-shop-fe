import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const defaultTheme = createTheme();

function EmployeeForm({ item, setItem, handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Employee
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  autoComplete="username"
                  autoFocus
                  value={item.UserName}
                  onChange={(e) => setItem({ ...item, UserName: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label=" Name"
                  autoFocus
                  value={item.Name}
                  onChange={(e) => setItem({ ...item, Name: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                {" "}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">category </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="category"
                      value={item.RoleID}
                      onChange={(e) => setItem({ ...item, RoleID: e.target.value })}
                    >
                      <MenuItem value={2002}>Admin</MenuItem>
                      <MenuItem value={2003}>Employee</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MuiTelInput
                  defaultCountry="VN"
                  value={item.PhoneNumber}
                  onChange={(e) => {
                    setItem({ ...item, PhoneNumber: e });
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={item.Password}
                  onChange={(e) => setItem({ ...item, Password: e.target.value })}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" onChange={handleCheckboxChange} />}
                  label="Show Password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EmployeeForm;
