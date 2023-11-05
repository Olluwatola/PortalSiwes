import FilterTabs from "./FilterTabs";
import {
  getAllNotReviewedApplications,
  getAllPendingApplications,
  getAllUnderReviewedApplications,
  getAllAcceptedApplications,
  getAllRejectedApplications,
  getAllApplications,
} from "./../../controllers/fetchApplication";

const ApplicationsPageTabs = ({
  category,
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError,
}) => {
  //const [filter, setFilter] = useState();

  return (
    <>
      <FilterTabs
        name={"Not Reviewed"}
        onClickFunction={() => {
          getAllNotReviewedApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        name={"Pending (written test)"}
        onClickFunction={() => {
          getAllPendingApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        name={"Under Review"}
        onClickFunction={() => {
          getAllUnderReviewedApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        name={"Approved"}
        onClickFunction={() => {
          getAllAcceptedApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        name={"Declined"}
        onClickFunction={() => {
          getAllRejectedApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        name={"All"}
        onClickFunction={() => {
          getAllApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
    </>
  );
};

export default ApplicationsPageTabs;
