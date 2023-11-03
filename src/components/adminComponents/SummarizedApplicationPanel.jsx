import { useEffect, useState } from "react";
import { db } from "./../../config/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import ApplicationListItem from "./adminListItem/ApplicationListItem";

const SummarizedAppicationPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState(null);
  const applicationCollectionRef = collection(db, "studentApplication");
  let returnedApplications;

  async function fetchSummarizeApplication() {
    try {
      const q = query(
        applicationCollectionRef,
        where("isRejected", "==", false),
        where("isAccepted", "==", false),
        where("hasWrittenApplicationTest", "==", true)
      );
      const data = await getDocs(q);
      returnedApplications = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //.filter((doc) => !doc.isRejected && !doc.isAccepted);
    } catch (err) {
      console.error(err);
      setGetApplicationsError(err);
    }
  }

  async function handleFetchSummarizeApplication() {
    setIsLoading(true);
    await fetchSummarizeApplication();
    setArrayOfApplication(returnedApplications);
    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted
    setIsLoading(true);
    async function getApplications() {
      try {
        await fetchSummarizeApplication();

        // Check if the component is still mounted before updating state
        if (isMounted) {
          setArrayOfApplication(returnedApplications);
          console.log(returnedApplications);
        }
      } catch (err) {
        console.error(err);
        setGetApplicationsError(err);
      } finally {
        setIsLoading(false);
      }
    }

    getApplications();

    // Cleanup function
    return () => {
      isMounted = false; // Mark the component as unmounted
    };
  }, []);

  return (
    <>
      <h2>PENDING APPLICATIONS</h2>
      <small>
        these are applications that have written the accessment test, but have
        not been accepted nor been declined
      </small>
      <br />
      <button onClick={handleFetchSummarizeApplication}>refresh</button>
      {isLoading
        ? "loading...."
        : arrayOfApplication?.map((item, index) => (
            <ApplicationListItem
              index={index}
              application={item}
              key={item.id}
            />
          ))}
      {getApplicationsError ? getApplicationsError : null}
    </>
  );
};

export default SummarizedAppicationPanel;
