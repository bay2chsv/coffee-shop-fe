import * as React from "react";
import { Box, Button, Link } from "@mui/material";

import { accessToken, baseAPIAuth, configAuth } from "@/utils/constant";
import InfoUser from "./Info";
import axios from "axios";

function Profile() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [profile, setProfile] = React.useState({});
  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${baseAPIAuth}/profile`, configAuth(accessToken));
      const { email, fullName } = data.data;
      setProfile({ email: email, fullName: fullName });
      setIsLogin(true);
    } catch (e) {}
  };
  React.useEffect(() => {
    getProfile();
  }, []);
  if (isLogin) {
    return (
      <Box>
        {profile.fullName}
        <InfoUser />
      </Box>
    );
  }
  return (
    <Box>
      <Link sx={{ mr: 2 }} href="/login">
        Login
      </Link>
      <Link sx={{ mr: 2 }} href="/register">
        Register
      </Link>
    </Box>
  );
}

export default Profile;
