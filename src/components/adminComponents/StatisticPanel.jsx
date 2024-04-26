import ElementBox from "./ElementBox";
import { useState, useEffect } from "react";
import statisticCalibrator from "./../../utils/statisticCalibrator";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./../../config/firebase";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";
import { MdOutlineRefresh } from "react-icons/md";

const StatisticPanel = () => {
  //const arrayOfapplicatiions=['app1','app2','app3'];
  const [calibrationLoading, setCalibrationLoading] = useState(false);
  const [totalNumberOfApplications, setTotalNumberOfApplications] = useState(
    <Skeleton />
  );
  const [numberOfRejectedApplications, setNumberOfRejectedApplications] =
    useState(<Skeleton />);
  const [numberOfAcceptedApplications, setNumberOfAcceptedApplications] =
    useState(<Skeleton />);
  const [numberOfPendingApplications, setNumberOfPendingApplications] =
    useState(<Skeleton />);
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
    <div className="mt-5 flex flex-col gap-5">
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
        <div
          className="cursor-pointer text-2xl bg-white shadow-lg shadow-slate-100 border border-neutral-100 rounded-xl p-5 flex flex-col items-center justify-center gap-3"
          onClick={() =>
            handleCalibrateStatistics(calibrationLoading, setCalibrationLoading)
          }
        >
          <span className="text-neutral-500 text-sm tracking-widest">
            CALIBRATE STATS
          </span>
          <div
            className={`${calibrationLoading ? "animate-spin" : null}
            w-12 h-12 rounded-full bg-primary text-white flex justify-center items-center`}
          >
            <MdOutlineRefresh />
          </div>
          <span className={`
          ${fetchStatisticsError ? "text-red-500" : "text-neutral-500"}
          text-xs tracking-widest text-center`}>
            {fetchStatisticsError
              ? "Error fetching application statistics, report issue"
              : "We recommend you calibrate statistics every week"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticPanel;
