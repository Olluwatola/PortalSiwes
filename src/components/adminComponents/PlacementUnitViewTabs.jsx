import React, { useState } from "react";
import FilterTabs from "./FilterTabs";
import {
  getAllAwaitingPlacement,
  getAllPlacedToCertainUnit,
} from "./../../controllers/fetchApplication";

const PlacementUnitViewTabs = ({
  setLoadPlacedApplicants,
  loadPlacedApplicants,
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError,
  unit,
}) => {
  // State to track the current view
  const [currentView, setCurrentView] = useState("awaiting");

  // Function to handle click on the button
  const handleClick = async () => {
    if (currentView === "awaiting") {
      // Fetch applications awaiting placement
      await getAllAwaitingPlacement(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError
      );
      // Toggle loadPlacedApplicants state
      if (loadPlacedApplicants) {
        setLoadPlacedApplicants(false);
      }
    } else {
      // Fetch applications placed to certain unit
      await getAllPlacedToCertainUnit(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError,
        unit
      );
      // Toggle loadPlacedApplicants state
      if (!loadPlacedApplicants) {
        setLoadPlacedApplicants(true);
      }
    }
    // Toggle currentView state
    setCurrentView(currentView === "awaiting" ? "placed" : "awaiting");
  };

  return (
    <>
      <FilterTabs
        variant={true}
        name={
          currentView === "awaiting"
            ? "Add New"
            : `${unit.toUpperCase()} Placements`
        }
        onClickFunction={handleClick}
      />
    </>
  );
};

export default PlacementUnitViewTabs;
