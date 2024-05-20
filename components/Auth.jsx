import * as React from "react";
import { Box } from "@mui/material";

import { accessToken } from "@/utils/constant";
import InfoUser from "./Info";

function MainAuth() {
  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    }
  }, [accessToken]);
  if (isLogin) {
    return (
      <Box>
        <InfoUser />
      </Box>
    );
  }
  return <Box></Box>;
}

export default MainAuth;
