import { Outlet, useLocation, Navigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

const PrivateRoutesLayout = ({ isAuthReady, userProfile }) => {
  const location = useLocation();

  if (!isAuthReady) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <div className="">
          <Skeleton count={1} className="w-48 h-10" />
        </div>
      </div>
    );
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
