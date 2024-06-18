import React from "react";
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Cookies from "js-cookie";
import axios from "axios";
import { accessToken, baseAPIAuth, configAuth } from "@/utils/constant";
import { useRouter } from "next/router";
function InfoUser() {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`${baseAPIAuth}/signout`, {}, configAuth(accessToken));
      if (data.success) {
        const cookieNames = Object.keys(Cookies.get());
        // Remove each cookie
        cookieNames.forEach((cookieName) => {
          Cookies.remove(cookieName);
        });
        router.reload();
      }
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ ml: 2 }}>
          <Avatar alt="Remy Sharp" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <Button
            style={{ textTransform: "none", color: "black" }}
            onClick={() => {
              handleSubmit();
            }}
            endIcon={<LoginIcon />}
          >
            <Typography>Logout</Typography>
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default InfoUser;
