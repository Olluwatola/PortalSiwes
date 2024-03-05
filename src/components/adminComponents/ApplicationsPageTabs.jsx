import FilterTabs from "./FilterTabs";
import { useState, useEffect } from "react";
import {
  getAllNotReviewedApplications,
  getAllPendingApplications,
  getAllUnderReviewedApplications,
  getAllAcceptedApplications,
  getAllRejectedApplications,
  getAllApplications,
} from "./../../controllers/fetchApplication";

const ApplicationsPageTabs = ({
  // category,
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError,
}) => {
  //const [filter, setFilter] = useState();
  const [active, setActive] = useState("Not Reviewed");

  useEffect(() => {
    if (active === "Not Reviewed") {
      setActive("Not Reviewed");
    }
    if (active === "Pending") {
      setActive("Pending");
    }
    if (active === "Review") {
      setActive("Review");
    }
    if (active === "Approved") {
      setActive("Approved");
    }
    if (active === "Declined") {
      setActive("Declined");
    }
    if (active === "All") {
      setActive("All");
    }
  }, [active]);

  return (
    <div className="mt-8 flex items-center gap-10">
      <FilterTabs
        active={active}
        name={"All"}
        onClickFunction={() => {
          setActive("All");
          getAllApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        active={active}
        name={"Not Reviewed"}
        onClickFunction={() => {
          setActive("Not Reviewed");
          getAllNotReviewedApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        active={active}
        name={"Pending"}
        onClickFunction={() => {
          setActive("Pending");
          getAllPendingApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        active={active}
        name={"Reviewed"}
        onClickFunction={() => {
          setActive("Reviewed");
          getAllUnderReviewedApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        active={active}
        name={"Approved"}
        onClickFunction={() => {
          setActive("Approved");
          getAllAcceptedApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
      <FilterTabs
        active={active}
        name={"Declined"}
        onClickFunction={() => {
          setActive("Declined");
          getAllRejectedApplications(
            setArrayOfApplication,
            setIsLoading,
            returnedApplications,
            setGetApplicationsError
          );
        }}
      />
    </div>
  );
};

export default ApplicationsPageTabs;
