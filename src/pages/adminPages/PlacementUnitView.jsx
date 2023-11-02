import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlacementUnitViewTabs from "./../../components/adminComponents/PlacementUnitViewTabs";
import ApplicationSelect from "./../../components/adminComponents/ApplicationSelect";
import ApplicationListItem from "./../../components/adminComponents/adminListItem/ApplicationListItem";
import { getAllAwaitingPlacement } from "./../../controllers/fetchApplication";
import { placeToUnit } from "./../../controllers/placementControllers";

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

const PlacementUnitView = () => {
  const { unit } = useParams();
  let returnedApplications;
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [arrayOfApplicantsToBePosted, setArrayOfApplicantsToBePosted] =
    useState([]);
  const [loadPlacedApplicants, setLoadPlacedApplicants] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [placingError, setPlacingError] = useState(undefined)

  useEffect(() => {
    // Apply unscrollableBodyStyles to the body element
    document.body.style.overflow = "hidden";

    // Clean up the style when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  useEffect(() => {
    async function handleFetchApplication() {
      await getAllAwaitingPlacement(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError
      );
    }

    handleFetchApplication();

    // return () => {
    //   second;
    // };
  }, []);

  function handleGoBack() {
    window.history.back();
  }
  return (
    <>
      <h1>Placement Posting</h1>
      ITeMS, {unit?.toUpperCase()} |
      <button
        onClick={() => {
          handleGoBack();
        }}
      >
        Go back
      </button>
      <br />
      <div style={containerStyles}>
        <PlacementUnitViewTabs
          unit={unit}
          setArrayOfApplication={setArrayOfApplication}
          setIsLoading={setIsLoading}
          returnedApplications={returnedApplications}
          setGetApplicationsError={setGetApplicationsError}
          loadPlacedApplicants={loadPlacedApplicants}
          setLoadPlacedApplicants={setLoadPlacedApplicants}
        />
        <br />
        {getApplicationsError === null ? (
          loadPlacedApplicants === false ? (
            <>
              <h6>
                ***Select Applicants(s) you want to place to{" "}
                {unit?.toUpperCase()}
                ***
              </h6>
              <div style={scrollableDivStyles}>
                <ApplicationSelect
                  arrayOfApplicantsToBePosted={arrayOfApplicantsToBePosted}
                  setArrayOfApplicantsToBePosted={
                    setArrayOfApplicantsToBePosted
                  }
                  arrayOfApplication={arrayOfApplication}
                  unit={unit}
                />
              </div>
              <button
                onClick={() => {
                  placeToUnit(unit, arrayOfApplicantsToBePosted,setSuccessMessage,setPlacingError);
                }}
              >
                Place to {unit.toUpperCase()}
              </button><br/>
              {successMessage === undefined ? null : successMessage}<br/>
              {placingError === undefined ? null : placingError}

            </>
          ) : (
            <>
              {arrayOfApplication?.map((item, index) => (
                <div style={scrollableDivStyles}>
                  <ApplicationListItem
                    index={index}
                    application={item}
                    key={item.id}
                    arrayOfApplication={arrayOfApplication}
                    setArrayOfApplication={setArrayOfApplication}
                  />
                  <br />
                </div>
              ))}
            </>
          )
        ) : isLoading ? (
          "Loading..."
        ) : (
          getApplicationsError
        )}
      </div>
    </>
  );
};

export default PlacementUnitView;
