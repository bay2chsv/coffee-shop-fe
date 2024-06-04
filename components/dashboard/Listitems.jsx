import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useRouter } from "next/router";
import ArticleIcon from "@mui/icons-material/Article";
import ChatIcon from "@mui/icons-material/Chat";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
export const AdminListItems = () => {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;
  return (
    <React.Fragment>
      {/* Dashboard */}
      <ListItemButton selected={isActive("/admin")} href="/admin" sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      {/* Accounts */}
      <ListItemButton
        selected={isActive("/admin/accounts")}
        href="/admin/accounts"
        sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Accounts" />
      </ListItemButton>
      {/* bill */}
      <ListItemButton
        selected={isActive("/admin/bills")}
        href="/admin/bills"
        sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}
      >
        <ListItemIcon>
          <CategoryOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Bills" />
      </ListItemButton>
      {/* Drinks */}
      <ListItemButton
        selected={isActive("/admin/drinks")}
        href="/admin/drinks"
        sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}
      >
        <ListItemIcon>
          <SellOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Drinks" />
      </ListItemButton>
      {/* Categories */}
      <ListItemButton
        selected={isActive("/admin/categories")}
        href="/admin/categories"
        sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}
      >
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const ManagerListItems = () => {
  const router = useRouter();
  // Function to check if the path matches the current URL
  const isActive = (path) => router.pathname === path;
  return (
    <React.Fragment>
      {/* Dashboard */}
      <ListItemButton
        selected={isActive("/manager")}
        href="/manager"
        sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      {/* bill */}
      <ListItemButton
        selected={isActive("/manager/bills")}
        href="/manager/bills"
        sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}
      >
        <ListItemIcon>
          <CategoryOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Bills" />
      </ListItemButton>
      {/* Drinks */}
      <ListItemButton
        selected={isActive("/manager/drinks")}
        href="/manager/drinks"
        sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}
      >
        <ListItemIcon>
          <SellOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Tables" />
      </ListItemButton>
      {/* Categories */}
      <ListItemButton
        selected={isActive("/manager/categories")}
        href="/manager/categories"
        sx={{ "&.Mui-selected": { backgroundColor: "#6881FF", color: "white" } }}
      >
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Drinks" />
      </ListItemButton>
    </React.Fragment>
  );
};
export const EmployeeListItems = () => {
  const router = useRouter();

  // Function to check if the path matches the current URL
  const isActive = (path) => router.pathname === path;

  return (
    <React.Fragment>
      <ListItemButton
        selected={isActive("/employee")}
        href="/employee"
        sx={{ "&.Mui-selected": { backgroundColor: "primary.main", color: "white" } }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Main" />
      </ListItemButton>
      <ListItemButton
        href="/employee/bills"
        selected={isActive("/employee/bills")}
        sx={{ "&.Mui-selected": { backgroundColor: "primary.main", color: "white" } }}
      >
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Bill today" />
      </ListItemButton>
    </React.Fragment>
  );
};
