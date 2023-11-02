import { db } from "../config/firebase";
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";

const applicationCollectionRef = collection(db, "studentApplication");

export async function getAllNotReviewedApplications(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("isRejected", "==", false),
      where("isAccepted", "==", false),
      where("isReviewed", "==", false)
    );
    const data = await getDocs(q);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getAllNotInvitedApplications(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("isRejected", "==", false),
      where("isAccepted", "==", false),
      where("hasBeenInvitedForTest", "==", false)
    );
    const data = await getDocs(q);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getAllPendingApplications(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
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
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getAllUnderReviewedApplications(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("isRejected", "==", false),
      where("isAccepted", "==", false),
      where("isReviewed", "==", true)
    );
    const data = await getDocs(q);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getAllAcceptedApplications(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("isRejected", "==", false),
      where("isAccepted", "==", true)
    );
    const data = await getDocs(q);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getAllRejectedApplications(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("isRejected", "==", true),
      where("isAccepted", "==", false)
    );
    const data = await getDocs(q);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getAllApplications(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const data = await getDocs(applicationCollectionRef);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getAllAwaitingPlacement(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("isRejected", "==", false),
      where("isAccepted", "==", true),
      where("hasGottenPlacement", "==", false)
    );
    const data = await getDocs(q);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getAllPlacedToCertainUnit(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError,
  unit
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("isRejected", "==", false),
      where("isAccepted", "==", true),
      where("hasGottenPlacement", "==", true),
      where("placedTo", "==", unit)
    );
    const data = await getDocs(q);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
    console.log(returnedApplications);
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}

export async function getOneApplication(
  applicationId,
  setGetApplicationsError
) {
  try {
    const studentApplicationDocumentRef = doc(
      db,
      "studentApplication",
      applicationId
    );
    let returnedApplication = await getDoc(studentApplicationDocumentRef);
    console.log("up next");
    console.log(returnedApplication.data());
    console.log({
      ...returnedApplication.data(),
      id: returnedApplication._key.path.segments[1],
    });
    const userObj = {
      ...returnedApplication.data(),
      id: returnedApplication._key.path.segments[1],
    };
    return userObj;

    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
  }
}

export async function fetchApplications(
  applicationCollectionRef,
  setIsLoading,
  setArrayOfApplication,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("hasBeenInvitedForTest", "==", false)
    );

    const data = await getDocs(q);
    const returnedApplications = data.docs?.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setArrayOfApplication(returnedApplications);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err.message);
  } finally {
    setIsLoading(false);
  }
}

export async function fetchApprovedNotPlacedApplications(
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError
) {
  setIsLoading(true);
  try {
    const q = query(
      applicationCollectionRef,
      where("isRejected", "==", false),
      where("isAccepted", "==", true),
      where("hasGottenPlacement", "==", false)
    );
    const data = await getDocs(q);
    returnedApplications = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc?.id,
    }));
    if (returnedApplications.length < 1) {
      setArrayOfApplication([]);
      console.log(returnedApplications);
    } else {
      setArrayOfApplication(returnedApplications);
      console.log(returnedApplications);
    }
    setIsLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setGetApplicationsError(err);
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}