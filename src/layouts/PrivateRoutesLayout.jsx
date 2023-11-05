import { Outlet, useLocation, Navigate } from "react-router-dom";

const PrivateRoutesLayout = ({ isAuthReady, userProfile }) => {
  const location = useLocation();

  if (!isAuthReady) {
    return "Loading..."; // Display a loading message while waiting for authentication data
  } else if (
    userProfile?.role === "admin" ||
    userProfile?.role === "superAdmin"
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/auth" state={{ from: location }} replace />;
  }
};

export default PrivateRoutesLayout;
