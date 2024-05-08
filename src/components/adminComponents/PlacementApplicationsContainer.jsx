import { useEffect, useState } from "react";
import ApplicationsListItem from "./adminListItem/ApplicationListItem";
import { fetchApprovedNotPlacedApplications } from "./../../controllers/fetchApplication";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

const PlacementApplicationsContainer = () => {
  const [arrayOfApplication, setArrayOfApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  let returnedApplications;
  useEffect(() => {
    fetchApprovedNotPlacedApplications(
      setArrayOfApplication,
      setIsLoading,
      returnedApplications,
      setGetApplicationsError
    );

    // return () => {
    //   second;
    // };
  }, [returnedApplications]);

  return (
    <>
      {isLoading ? (
        <Skeleton count={4} className="w-full h-16 rounded-md gap-1" />
      ) : arrayOfApplication ? (
        <>
          {arrayOfApplication?.map((item, index) => (
            <>
              <ApplicationsListItem
                index={index}
                application={item}
                key={item.id}
                arrayOfApplication={arrayOfApplication}
                setArrayOfApplication={setArrayOfApplication}
              />
              <br />
            </>
          ))}
        </>
      ) : arrayOfApplication?.length === 0 ? (
        "no applicaton fetched"
      ) : (
        "an error occurred"
      )}
    </>
  );
};

export default PlacementApplicationsContainer;
