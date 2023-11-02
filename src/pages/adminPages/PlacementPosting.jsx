import { useEffect } from "react";
import Departments from "./../../components/adminComponents/Departments";
import PlacementApplicationContainer from "./../../components/adminComponents/PlacementApplicationsContainer";

const containerStyles = {
  height: "100vh",
  // display: "flex",
  // flexDirection: "row",
};

const scrollableDivStyles = {
  flex: "1",
  overflowY: "scroll",
  border: "1px solid #ccc",
  padding: "10px",
};

const PlacementPosting = () => {
  useEffect(() => {
    // Apply unscrollableBodyStyles to the body element
    document.body.style.overflow = "hidden";

    // Clean up the style when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <h1>Placement Posting</h1>

      <div style={containerStyles}>
        <Departments />
        <hr />
        <h2>Place Applications to units</h2>
        <p>***Approved applications that have not been placed to a unit***</p>
        <div style={scrollableDivStyles}>
          <PlacementApplicationContainer />
        </div>
      </div>
    </>
  );
};

export default PlacementPosting;
