import Navbar from "../components/Navbar";
import Header from "../components/adminComponents/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children, userProfile, applyModal, setapplyModal }) => {
  const location = useLocation();

  const isProtectedRoute = location.pathname.startsWith("/admin");
  const isAdmin = userProfile?.role === "admin" || userProfile?.role === "superAdmin";

  if (isProtectedRoute && isAdmin) {
    console.log(userProfile.role);
    return (
      <div className="flex gap-5 w-screen h-screen overflow-hidden pt-10 pr-10">
        <Navbar
          userProfile={userProfile}
          applyModal={applyModal}
          setapplyModal={setapplyModal}
        />
        <div className="flex gap-5 flex-col w-full">
          <Header />
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Navbar
          userProfile={userProfile}
          applyModal={applyModal}
          setapplyModal={setapplyModal}
        />
        {children}
        <Footer />
      </>
    );
  }
};

export default Layout;
