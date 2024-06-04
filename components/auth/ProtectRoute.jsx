// components/ProtectedRoute.js

import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { accessToken, getRole } from "@/utils/constant";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      window.location.href = "/login";
    } else {
      getRole(accessToken)
        .then((retrievedRole) => {
          setRole(retrievedRole);
          setLoading(false);
        })
        .catch(() => {
          window.location.href = "/login";
        });
    }
  }, []);
  // Empty dependency array ensures this code only runs on the client-side
  if (loading) {
    return <Skeleton animation="wave" height={100} />;
  }
  if (requiredRole.includes(role)) {
    return children;
  } else {
    window.location.href = "/login"; // Redirect to a not authorized page if the role does not match
    return null;
  }
};

export default ProtectedRoute;
