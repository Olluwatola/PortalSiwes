import { db } from "./../config/firebase";

import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

const applicationCollectionRef = collection(db, "studentApplication");
const statisticsDocumentRef = doc(
  db,
  "applicationStatistics",
  "fqDD8A6q132BtPoTp2sO"
);

const statisticCalibrator = async (
  calibrationLoading,
  setCalibrationLoading
) => {
  //fetch the documents
  //count the everything
  //count the ones that have status==accepted
  //count the ones that have status== rejected
  //update the one document in the statistics collection with the values gotten

  setCalibrationLoading(true);
  let numberOfAcceptedApplications;
  let numberOfRejectedApplications;
  let totalNumberOfApplications;
  let numberOfPendingApplications;
  const data = await getDocs(applicationCollectionRef);
  const results = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  totalNumberOfApplications = results?.length;
  numberOfAcceptedApplications = results?.filter(
    (doc) => doc.isAccepted
  )?.length;

  numberOfRejectedApplications = results.filter(
    (doc) => doc.isRejected
  )?.length;
  numberOfPendingApplications = results
    .filter((doc) => doc.isRejected === false)
    ?.filter((doc) => doc.isAccepted === false)
    ?.filter((doc) => doc.hasWrittenApplicationTest === true)?.length;

  console.log(
    totalNumberOfApplications,
    numberOfAcceptedApplications,
    numberOfRejectedApplications
  );

  await updateDoc(statisticsDocumentRef, {
    numberOfAcceptedApplications: numberOfAcceptedApplications,
    numberOfRejectedApplications: numberOfRejectedApplications,
    totalNumberOfApplications: totalNumberOfApplications,
    numberOfPendingApplications: numberOfPendingApplications,
  });

  setCalibrationLoading(false);
};

export default statisticCalibrator;
