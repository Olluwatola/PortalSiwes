import { useEffect, useState } from "react";
import { db } from "./../../config/firebase";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";
import { query, where, getDocs, collection } from "firebase/firestore";
import ApplicationListItem from "./adminListItem/ApplicationListItem";
import ApplicationsPageTabs from "./ApplicationsPageTabs";
import {
  getAllPendingApplications,
  getAllRejectedApplications,
  getAllNotReviewedApplications,
  getAllAcceptedApplications,
  getAllApplications,
} from "./../../controllers/fetchApplication";

const applicationCollectionRef = collection(db, "studentApplication");

const ApplicationsPanel = ({ category }) => {
  let returnedApplications;
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState(null);

  useEffect(() => {
    if (category === undefined) {
      getAllNotReviewedApplications(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError
      );
    }
    if (category === "all") {
      getAllApplications(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError
      );
    }
    if (category === "accepted") {
      getAllAcceptedApplications(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError
      );
    }
    if (category === "rejected") {
      getAllRejectedApplications(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError
      );
    }
    if (category === "pending") {
      getAllPendingApplications(
        setArrayOfApplication,
        setIsLoading,
        returnedApplications,
        setGetApplicationsError
      );
    }
    // async function fetchUnreviewedApplications() {
    //   setIsLoading(true);
    //   try {
    //     const q = query(
    //       applicationCollectionRef,
    //       where("isRejected", "==", false),
    //       where("isAccepted", "==", false),
    //       where("isReviewed", "==", false)
    //     );
    //     const data = await getDocs(q);
    //     returnedApplications = data.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     setArrayOfApplication(returnedApplications);
    //     console.log(returnedApplications);
    //     setIsLoading(false);
    //   } catch (error) {
    //     setGetApplicationsError(error.message);
    //     setIsLoading(false);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    // fetchUnreviewedApplications();

    //   return () => {
    //     second
    //   }
  }, []);

  return (
    <>
      <ApplicationsPageTabs
        category={category}
        setArrayOfApplication={setArrayOfApplication}
        setIsLoading={setIsLoading}
        returnedApplications={returnedApplications}
        setGetApplicationsError={setGetApplicationsError}
      />{" "}
      <br />
      {isLoading ? (
        <Skeleton className="h-20 gap-1 rounded-lg"  count={10} />
      ) : arrayOfApplication ? (
        <>
          {arrayOfApplication?.map((item, index) => (
            <>
              <ApplicationListItem
                index={index}
                application={item}
                key={item.id}
                arrayOfApplication={arrayOfApplication}
                setArrayOfApplication={setArrayOfApplication}
              />
            </>
          ))}
        </>
      ) : arrayOfApplication?.length === 0 ? (
        "no applicaton fetched"
      ) : (
        "an error occurred"
      )}
      <br />
      {getApplicationsError ? getApplicationsError : null}
    </>
  );
};

export default ApplicationsPanel;
