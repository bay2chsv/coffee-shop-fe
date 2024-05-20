// components/ProtectedRoute.js

import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import { accessToken, getRole } from "@/utils/constant";

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = getRole(accessToken);
  useEffect(() => {
    if (!accessToken) {
      window.location.href = "/login";
    }
  }, [role]); // Empty dependency array ensures this code only runs on the client-side
  return requiredRole.some((role) => requiredRole.includes(role)) ? children : <Skeleton animation="wave" height={100} />;
  return children;
};

export default ProtectedRoute;
