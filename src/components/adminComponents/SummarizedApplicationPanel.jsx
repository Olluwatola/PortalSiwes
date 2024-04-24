import { useEffect, useState } from "react";
import { db } from "./../../config/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import ApplicationListItem from "./adminListItem/ApplicationListItem";
import { Link } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

const SummarizedAppicationPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState(null);
  const applicationCollectionRef = collection(db, "studentApplication");
  const [lastIndex, setLastIndex] = useState(0);
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
          const lastIndex = returnedApplications.length - 1;
          setLastIndex(lastIndex);
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
    <div className="flex flex-col gap-5 w-[70%]">
      <span className="text-neutral-500 text-xs tracking-widest flex justify-between">
        PENDING APPLICATIONS
        <div className="flex items-center gap-3">
          <button onClick={handleFetchSummarizeApplication} hint="refresh">
            <MdOutlineRefresh
              className={`${isLoading ? "animate-spin" : null} text-lg`}
            />
          </button>
          <Link
            className="text-primary"
            to="/admin/applications/category/pending"
          >
            View all
          </Link>
        </div>
      </span>
      <span
        className={`
      ${getApplicationsError ? "text-red-500" : "hidden"}
      text-xs tracking-widest`}
      >
        {getApplicationsError ? getApplicationsError : null}
      </span>
      <div className="bg-white max-w-full h-[50vh] overflow-x-auto shadow-md border border-neutral-100 rounded-xl p-5 flex flex-col items-center gap-3">
        {isLoading ? (
          <div className="w-full">
            <Skeleton count={3} className="h-16" />
          </div>
        ) : (
          <div className="w-full">
            <div className="w-full mb-3 flex items-center justify-between text-neutral-400 text-xs">
              <span className="w-4"></span>
              <span className="w-52">NAME</span>
              <span className="w-64">EMAIL ADDRESS</span>
              <span className="w-32">DURATION</span>
              <span className="w-32">DEPARTMENT</span>
            </div>
            {arrayOfApplication?.map((item, index) => (
              <ApplicationListItem
                index={index}
                lastIndex={lastIndex}
                application={item}
                key={item.id}
                showStatusState={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarizedAppicationPanel;
