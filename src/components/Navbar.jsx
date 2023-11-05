// Navbar.js
import { useLocation } from "react-router-dom";
//import { auth } from "./../config/firebase";

import AdminNavbar from "./adminComponents/AdminNavbar";
import PublicNavbar from "./mainAppComponents/PublicNavbar";

const Navbar = ({userProfile}) => {
  const location = useLocation();
  
  const isProtectedRoute = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname.startsWith("/admin/auth");

  if (isProtectedRoute && isLoginPage) {
    return null;
  } else if (isProtectedRoute) {
    if (userProfile?.role === "admin" || userProfile?.role === "superAdmin") {
      console.log(userProfile.role)
      return <AdminNavbar />;
    } else {
      return null;
    }
  } else {
    return <PublicNavbar />;
  }
};

export default Navbar;
