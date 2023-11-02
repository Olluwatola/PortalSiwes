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
  return (
    <>
      <FilterTabs
        name={"awaiting placement"}
        onClickFunction={async () => {
          await getAllAwaitingPlacement(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
          if (loadPlacedApplicants) {
            setLoadPlacedApplicants(!loadPlacedApplicants);
          }
        }}
      />
      <FilterTabs
        name={`Applications placed to ${unit.toUpperCase()}`}
        onClickFunction={async () => {
          await getAllPlacedToCertainUnit(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError,
            unit
          );
          if (loadPlacedApplicants === false) {
            setLoadPlacedApplicants(!loadPlacedApplicants);
          }
        }}
      />
    </>
  );
};

export default PlacementUnitViewTabs;
