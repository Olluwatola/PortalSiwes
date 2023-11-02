import { useEffect, useState } from "react";
import ApplicationsListItem from "./adminListItem/ApplicationListItem";
import { fetchApprovedNotPlacedApplications } from "./../../controllers/fetchApplication";

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
        <h1>loading applications....</h1>
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
