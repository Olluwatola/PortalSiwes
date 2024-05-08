import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlacementUnitViewTabs from "./../../components/adminComponents/PlacementUnitViewTabs";
import ApplicationSelect from "./../../components/adminComponents/ApplicationSelect";
import ApplicationListItem from "./../../components/adminComponents/adminListItem/ApplicationListItem";
import { getAllPlacedToCertainUnit } from "./../../controllers/fetchApplication";

const PlacementUnitView = () => {
  const { unit } = useParams();
  let returnedApplications;
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [arrayOfApplicantsToBePosted, setArrayOfApplicantsToBePosted] =
    useState([]);
  const [loadPlacedApplicants, setLoadPlacedApplicants] = useState(true);
  
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
      <div className="flex items-end pb-3 justify-between border-b border-neutral-200">
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
        <PlacementUnitViewTabs
          unit={unit}
          setArrayOfApplication={setArrayOfApplication}
          setIsLoading={setIsLoading}
          returnedApplications={returnedApplications}
          setGetApplicationsError={setGetApplicationsError}
          loadPlacedApplicants={loadPlacedApplicants}
          setLoadPlacedApplicants={setLoadPlacedApplicants}
        />
      </div>
      <div>
        {getApplicationsError === null ? (
          loadPlacedApplicants === false ? (
            <>
              <ApplicationSelect
                arrayOfApplicantsToBePosted={arrayOfApplicantsToBePosted}
                setArrayOfApplicantsToBePosted={setArrayOfApplicantsToBePosted}
                arrayOfApplication={arrayOfApplication}
                unit={unit}
              />
            </>
          ) : (
            <div className="w-full">
              <div className="w-full mt-5 mb-4 flex items-center justify-between text-neutral-400 text-xs">
                <span className="w-4"></span>
                <span className="w-52">NAME</span>
                <span className="w-64">EMAIL ADDRESS</span>
                <span className="w-32">DURATION</span>
                <span className="w-36">DEPARTMENT</span>
                <span className="w-36">PHONE NUMBER</span>
              </div>
              {arrayOfApplication?.map((item, index) => (
                <ApplicationListItem
                  index={index}
                  showNumberState={true}
                  application={item}
                  key={item.id}
                  arrayOfApplication={arrayOfApplication}
                  setArrayOfApplication={setArrayOfApplication}
                />
              ))}
            </div>
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
