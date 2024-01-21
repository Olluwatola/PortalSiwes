import ElementBox from "./ElementBox";
import { useState, useEffect } from "react";
import statisticCalibrator from "./../../utils/statisticCalibrator";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./../../config/firebase";

const StatisticPanel = () => {
  //const arrayOfapplicatiions=['app1','app2','app3'];
  const [calibrationLoading, setCalibrationLoading] = useState(false);
  const [totalNumberOfApplications, setTotalNumberOfApplications] =
    useState("...");
  const [numberOfRejectedApplications, setNumberOfRejectedApplications] =
    useState("...");
  const [numberOfAcceptedApplications, setNumberOfAcceptedApplications] =
    useState("...");

  const [numberOfPendingApplications, setNumberOfPendingApplications] =
    useState("...");
  const [fetchStatisticsError, setFetchStatisticsError] = useState(false);
  const statisticsDocumentRef = doc(
    db,
    "applicationStatistics",
    "fqDD8A6q132BtPoTp2sO"
  );

  useEffect(() => {
    async function getApplicationStatistics() {
      const returnedStats = await getDoc(statisticsDocumentRef);
      if (returnedStats.exists()) {
        console.log("Document data:", returnedStats.data());
        setTotalNumberOfApplications(
          returnedStats.data().totalNumberOfApplications
        );
        setNumberOfAcceptedApplications(
          returnedStats.data().numberOfAcceptedApplications
        );
        setNumberOfRejectedApplications(
          returnedStats.data().numberOfRejectedApplications
        );
        setNumberOfPendingApplications(
          returnedStats.data().numberOfPendingApplications
        );
      } else {
        // docSnap.data() will be undefined in this case
        setFetchStatisticsError(true);
      }
    }
    getApplicationStatistics();
    return () => {};
  }, [statisticsDocumentRef]);

  function handleCalibrateStatistics(
    calibrationLoading,
    setCalibrationLoading
  ) {
    try {
      statisticCalibrator(calibrationLoading, setCalibrationLoading);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-5">
      <span className="text-3xl font-medium">Overview</span>
      <span className="text-neutral-500 text-sm tracking-widest">SUMMARY</span>
      <div className="grid grid-cols-3 gap-8">
        <ElementBox
          valueOfHeader={totalNumberOfApplications}
          link={"/admin/applications/category/all"}
        >
          Total Number of Applications
        </ElementBox>

        <ElementBox
          valueOfHeader={numberOfAcceptedApplications}
          link={"/admin/applications/category/accepted"}
        >
          Number of Applications Approved
        </ElementBox>

        <ElementBox
          valueOfHeader={numberOfRejectedApplications}
          link={"/admin/applications/category/rejected"}
        >
          Number of Applications Declined
        </ElementBox>
        <ElementBox
          valueOfHeader={numberOfPendingApplications}
          link={"/admin/applications/category/pending"}
        >
          Number of Pending Applications 

        </ElementBox>
      </div>

      <button
        onClick={() =>
          handleCalibrateStatistics(calibrationLoading, setCalibrationLoading)
        }
      >
        calibrate statistics
      </button>
      {calibrationLoading ? "loading..." : null}
      {fetchStatisticsError
        ? "error fetching application statistics, report issue"
        : null}
    </div>
  );
};

export default StatisticPanel;
