import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";
import * as React from "react";

function AccountForm({ handleChange, handleCheckboxChange, showPassword, handleCreate }) {
  const router = useRouter();
  return (
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography sx={{ mb: 2 }} component="h1" variant="h5">
          Create account
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            Full name:
          </Grid>
          <Grid item xs={9}>
            <TextField required fullWidth name="fullName" id="fullName" autoComplete="fullName" onChange={handleChange} autoFocus />
          </Grid>
          <Grid item xs={3}>
            Email:
          </Grid>
          <Grid item xs={9}>
            <TextField required fullWidth name="email" id="email" onChange={handleChange} autoComplete="email" autoFocus />
          </Grid>
          <Grid item xs={3}>
            Role:
          </Grid>
          <Grid item xs={9}>
            <FormControl fullWidth>
              <Select onChange={handleChange} name="roleId" labelId="demo-simple-select-label" id="demo-simple-select">
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Manager</MenuItem>
                <MenuItem value={3}>Employee</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            Password:
          </Grid>
          <Grid item xs={9}>
            <TextField
              required
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={9}>
            {" "}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={handleCheckboxChange} />}
              label="Show Password"
            />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Button fullWidth onClick={handleCreate} variant="contained">
              Create
            </Button>
          </Grid>
          <Grid item xs={3} sx={{ mb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => router.back()}
              sx={{ background: red[400], ":hover": { background: red[600] } }}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Box>
    </Container>
  );
}

export default AccountForm;
