import { useRouter } from "next/router";
import ProtectedRoute from "./auth/ProtectRoute";
import Dashboard from "./dashboard/Dashboard";
import { AdminListItems, EmployeeListItems, ManagerListItems, UserListItems } from "./dashboard/Listitems";

import styles from "../styles/Home.module.css";
import { AppBar, Box, Button, Container, Grid, Link, Toolbar, Typography } from "@mui/material";

import Profile from "./Profile";
import { useEffect, useState } from "react";
import Image from "next/image";
import Slideshow from "./SlideShow";
export default function Layout({ children }) {
  const router = useRouter();
  const isAdminDashboardPath = router.pathname.startsWith("/admin");
  const isMangerDashboardPath = router.pathname.startsWith("/manager");
  const isEmployeeDashboardPath = router.pathname.startsWith("/employee");

  const pathsToCheck = ["/manageinfohub", "/404", "/unauthorized", "/login", "/register"];

  const isMatchingPath = pathsToCheck.some((path) => {
    return router.pathname.startsWith(path) || router.pathname.includes(path);
  });
  if (isMangerDashboardPath) {
    return (
      <ProtectedRoute requiredRole={["admin", "manager"]}>
        <Dashboard name="Manger Dashboard" list={<ManagerListItems />}>
          {children}
        </Dashboard>
      </ProtectedRoute>
    );
  }
  if (isEmployeeDashboardPath) {
    return (
      <ProtectedRoute requiredRole={["admin", "manager", "employee"]}>
        <Dashboard name="Employee Dashboard" list={<EmployeeListItems />}>
          {children}
        </Dashboard>
      </ProtectedRoute>
    );
  }
  if (isAdminDashboardPath) {
    return (
      <ProtectedRoute requiredRole={["admin"]}>
        <Dashboard name="Admin Dashboard" list={<AdminListItems />}>
          {children}
        </Dashboard>
      </ProtectedRoute>
    );
  }
  if (isMatchingPath) {
    return <main>{children}</main>;
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
        <div style={{ flex: 1 }}></div>{" "}
        <Grid sx={{ display: "flex" }}>
          <Box sx={{ alignContent: "center" }}>
            <Link sx={{ mr: 2 }}>Home</Link>
          </Box>
          <Profile />
        </Grid>
      </div>
      <Grid
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
          mb: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/2.png" alt="Logo" style={{ width: "150px", height: "150px", marginBottom: "10px", borderRadius: 20 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Bay's coffee
        </Typography>
      </Grid>
      <Container>
        <Slideshow />
      </Container>
      <Container>{children}</Container>
    </div>
  );
}
