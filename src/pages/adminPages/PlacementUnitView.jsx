import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlacementUnitViewTabs from "./../../components/adminComponents/PlacementUnitViewTabs";
import ApplicationSelect from "./../../components/adminComponents/ApplicationSelect";
import ApplicationListItem from "./../../components/adminComponents/adminListItem/ApplicationListItem";
import { getAllPlacedToCertainUnit } from "./../../controllers/fetchApplication";
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
  const [loadPlacedApplicants, setLoadPlacedApplicants] = useState(true);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [placingError, setPlacingError] = useState(undefined);

  useEffect(() => {
    async function handleFetchApplication() {
      await getAllPlacedToCertainUnit(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError,
        unit
      );
    }

    handleFetchApplication();
  }, []);

  function handleGoBack() {
    window.history.back();
  }
  return (
    <div className="flex flex-col gap-5">
      <span className="text-3xl font-medium">Placement Posting</span>
      <div className="flex gap-2 items-center">
        <span className="text-primary">
          Interns at ITeMS, {unit?.toUpperCase()}
        </span>{" "}
        |
        <button
          className="text-neutral-400 text-sm"
          onClick={() => {
            handleGoBack();
          }}
        >
          GO BACK
        </button>
      </div>
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
                  placeToUnit(
                    unit,
                    arrayOfApplicantsToBePosted,
                    setSuccessMessage,
                    setPlacingError
                  );
                }}
              >
                Place to {unit.toUpperCase()}
              </button>
              <br />
              {successMessage === undefined ? null : successMessage}
              <br />
              {placingError === undefined ? null : placingError}
            </>
          ) : (
            <>
              placed here
              {arrayOfApplication?.map((item, index) => (
                <ApplicationListItem
                  index={index}
                  application={item}
                  key={item.id}
                  arrayOfApplication={arrayOfApplication}
                  setArrayOfApplication={setArrayOfApplication}
                />
              ))}
            </>
          )
        ) : isLoading ? (
          "Loading..."
        ) : (
          getApplicationsError
        )}
      </div>
    </div>
  );
};

export default PlacementUnitView;
