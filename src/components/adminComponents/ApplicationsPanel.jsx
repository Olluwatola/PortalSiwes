import { useEffect, useState } from "react";
import { db } from "./../../config/firebase";
import "react-loading-skeleton/dist/skeleton.css"; // Don't forget to import the styles
import Skeleton from "react-loading-skeleton";
import { query, where, getDocs, collection } from "firebase/firestore";
import ApplicationListItem from "./adminListItem/ApplicationListItem";
import ApplicationsPageTabs from "./ApplicationsPageTabs";
import Pagination from "../adminComponents/adminListItem/Pagination";
import {
  getAllPendingApplications,
  getAllRejectedApplications,
  getAllNotReviewedApplications,
  getAllAcceptedApplications,
  getAllApplications,
} from "./../../controllers/fetchApplication";

const applicationCollectionRef = collection(db, "studentApplication");

const ApplicationsPanel = ({ category }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    let fetchedApplications;
    switch (category) {
      case undefined:
        getAllNotReviewedApplications(
          setArrayOfApplication,
          setIsLoading,
          fetchedApplications,
          setGetApplicationsError
        );
        break;
      case "all":
        getAllApplications(
          setArrayOfApplication,
          setIsLoading,
          fetchedApplications,
          setGetApplicationsError
        );
        break;
      case "accepted":
        getAllAcceptedApplications(
          setArrayOfApplication,
          setIsLoading,
          fetchedApplications,
          setGetApplicationsError
        );
        break;
      case "rejected":
        getAllRejectedApplications(
          setArrayOfApplication,
          setIsLoading,
          fetchedApplications,
          setGetApplicationsError
        );
        break;
      case "pending":
        getAllPendingApplications(
          setArrayOfApplication,
          setIsLoading,
          fetchedApplications,
          setGetApplicationsError
        );
        break;
      default:
        break;
    }
  }, [category]);

  // Logic for pagination
  const totalPages = Math.ceil(
    arrayOfApplication?.length / applicationsPerPage
  );

  const onNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onLastClick = () => setCurrentPage(totalPages);

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = arrayOfApplication?.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, arrayOfApplication]);

  return (
    <>
      <ApplicationsPageTabs
        // category={category}
        setArrayOfApplication={setArrayOfApplication}
        setIsLoading={setIsLoading}
        setGetApplicationsError={setGetApplicationsError}
      />
      <br />
      {isLoading ? (
        <Skeleton className="h-20 gap-1 rounded-lg" count={10} />
      ) : currentApplications && currentApplications.length > 0 ? (
        <>
          {currentApplications.map((item, index) => (
            <ApplicationListItem
              key={item.id}
              index={index + indexOfFirstApplication}
              application={item}
              arrayOfApplication={arrayOfApplication}
              setArrayOfApplication={setArrayOfApplication}
              showStatusState={true}
            />
          ))}
          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
            onNextClick={onNextClick}
            onLastClick={onLastClick}
          />
        </>
      ) : arrayOfApplication?.length === 0 ? (
        "No application fetched"
      ) : (
        "An error occurred"
      )}
      <br />
      {getApplicationsError && getApplicationsError}
    </>
  );
};

export default ApplicationsPanel;
