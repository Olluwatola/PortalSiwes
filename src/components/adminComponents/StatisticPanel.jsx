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
    <>
      <h2>Overview</h2>
      <h4>SUMMARY</h4>

      <ElementBox
        valueOfHeader={totalNumberOfApplications}
        link={"/admin/applications"}
      >
        Total number of applications
      </ElementBox>

      <ElementBox
        valueOfHeader={numberOfAcceptedApplications}
        link={"/admin/applications/"}
      >
        Number of applications approved
      </ElementBox>

      <ElementBox
        valueOfHeader={numberOfRejectedApplications}
        link={"/admin/applications/"}
      >
        Number of applications declined
      </ElementBox>
      <ElementBox
        valueOfHeader={numberOfPendingApplications}
        link={"/admin/applications/"}
      >
        Number of pending applications (written test but not rejected nor
        accepted)
      </ElementBox>

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
    </>
  );
};

export default StatisticPanel;
