import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { handleGetUserProfile } from "./controllers/authControllers";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoutesLayout from "./layouts/PrivateRoutesLayout";
import Home from "./pages/mainAppPages/Home";
import Faqs from "./pages/mainAppPages/Faqs";
import About from "./pages/mainAppPages/About";
import ContactUs from "./pages/mainAppPages/ContactUs";
import Auth from "./pages/adminPages/Auth";
import Dashboard from "./pages/adminPages/Dashboard";
import ApplicationsPage from "./pages/adminPages/ApplicationsPage";
import ApplicationDetail from "./pages/adminPages/ApplicationDetail";
import PlacementPosting from "./pages/adminPages/PlacementPosting";
import PlacementUnitView from "./pages/adminPages/PlacementUnitView";
import ScreeningPage from "./pages/adminPages/ScreeningPage";
import InvitationDetails from "./pages/adminPages/InvitationDetails";
import PortalSettings from "./pages/adminPages/PortalSettings";




function App() {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        handleGetUserProfile(user.uid)
          .then((profile) => {
            auth.currentFirestoreProfile = profile;
            setUserProfile(profile);
            setIsAuthReady(true);
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
            setIsAuthReady(true);
          });
      } else {
        setIsAuthReady(true);
      }
    });

    return unsubscribe; // Cleanup the listener when the component unmounts
  }, []);

  return (
    <Router>
      <Navbar userProfile={userProfile} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/auth" element={<Auth />} />

        {/*private pages */}
        <Route
          element={
            <PrivateRoutesLayout
              isAuthReady={isAuthReady}
              userProfile={userProfile}
            />
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/applications" element={<ApplicationsPage />} />
          <Route
            path="/admin/applications/:id"
            element={<ApplicationDetail />}
          />
          <Route path="/admin/placement" element={<PlacementPosting />} />
          <Route
            path="/admin/placement/:unit"
            element={<PlacementUnitView />}
          />
          <Route path="/admin/screening" element={<ScreeningPage />} />
          <Route path="/admin/screening/:id" element={<InvitationDetails />} />
          <Route path="/admin/portal" element={<PortalSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
