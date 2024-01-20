import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { handleGetUserProfile } from "./controllers/authControllers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Error404 from "./pages/mainAppPages/error404";
import Layout from "./layouts/Layout";

function App() {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [applyModal, setapplyModal] = useState(false);

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
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              userProfile={userProfile}
              applyModal={applyModal}
              setapplyModal={setapplyModal}
            >
              <Home applyModal={applyModal} setapplyModal={setapplyModal} />
            </Layout>
          }
        />
        <Route
          path="/faqs"
          element={
            <Layout
              userProfile={userProfile}
              applyModal={applyModal}
              setapplyModal={setapplyModal}
            >
              <Faqs />
            </Layout>
          }
        />
        <Route
          path="/contactus"
          element={
            <Layout
              userProfile={userProfile}
              applyModal={applyModal}
              setapplyModal={setapplyModal}
            >
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout
              userProfile={userProfile}
              applyModal={applyModal}
              setapplyModal={setapplyModal}
            >
              <About />
            </Layout>
          }
        />
        <Route
          path="/admin/auth"
          element={
            <Layout
              userProfile={userProfile}
              applyModal={applyModal}
              setapplyModal={setapplyModal}
            >
              <Auth />
            </Layout>
          }
        />
        <Route path="*" element={<Error404 />} />
        {/*private pages */}
        <Route
          element={
            <PrivateRoutesLayout
              isAuthReady={isAuthReady}
              userProfile={userProfile}
            />
          }
        >
          <Route
            path="/admin"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/admin/applications/category/:c"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <ApplicationsPage />
              </Layout>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <ApplicationsPage />
              </Layout>
            }
          />
          <Route
            path="/admin/applications/:id"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <ApplicationDetail />
              </Layout>
            }
          />
          <Route
            path="/admin/placement"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <PlacementPosting />
              </Layout>
            }
          />
          <Route
            path="/admin/placement/:unit"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <PlacementUnitView />
              </Layout>
            }
          />
          <Route
            path="/admin/screening"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <ScreeningPage />
              </Layout>
            }
          />
          <Route
            path="/admin/screening/:id"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <InvitationDetails />
              </Layout>
            }
          />
          <Route
            path="/admin/portal"
            element={
              <Layout
                userProfile={userProfile}
                applyModal={applyModal}
                setapplyModal={setapplyModal}
              >
                <PortalSettings />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
