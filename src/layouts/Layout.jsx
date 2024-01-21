import Navbar from "../components/Navbar";
// import Header from "../components/adminComponents/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children, userProfile, applyModal, setapplyModal }) => {
  const location = useLocation();

  const isProtectedRoute = location.pathname.startsWith("/admin");
  const isAdmin =
    userProfile?.role === "admin" || userProfile?.role === "superAdmin";

  if (isProtectedRoute && isAdmin) {
    console.log(userProfile.role);
    return (
      <div className="flex w-screen h-screen overflow-hidden px-10">
        <div>
          <Navbar
            userProfile={userProfile}
            applyModal={applyModal}
            setapplyModal={setapplyModal}
          />
        </div>
        <div className="flex flex-col w-full pt-10 gap-5">
          {/* <Header /> */}
          <div className="overflow-y-auto flex-grow">{children}</div>
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
