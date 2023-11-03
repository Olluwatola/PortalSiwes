import { db, auth, storage } from "./../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { generateTimestampId } from "./../utils/idGenerator";
import {
  //getDocs,
  collection,
  addDoc,
  //deleteDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { removeSpecialCharacters } from "./../utils/removeSpecialCharacters";

const storageRef = ref(storage);
const applicationCollectionRef = collection(db, "studentApplication");
//const applicationDocumentRef = doc(db, "studentApplication", id);

function uploadFile(file, directoryString) {
  if (file) {
    const refName = removeSpecialCharacters(auth?.currentUser?.email);
    const endRef = ref(storageRef, directoryString + "/" + refName);

    uploadBytes(endRef, file)
      .then((snapshot) => {
        console.log(`Uploaded ${directoryString} file!`);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  } else {
    return;
  }
}

export async function createApplication(
  setConditionGood,
  setStatusBarMessage,
  IDfile,
  siwesFile,
  studentLastName,
  studentOtherNames,
  studentPhoneNumber,
  studentInstitution,
  studentLevel,
  studentCourse,
  aboutStudent,
  durationOfInternship
) {
  setConditionGood("loading");
  setStatusBarMessage("submitting your application...");
  const generatedID = generateTimestampId();
  try {
    uploadFile(IDfile, "id");
    uploadFile(siwesFile, "siwesFile");

    await setDoc(doc(db, "studentApplication", generatedID), {
      studentLastName: studentLastName,
      studentOtherNames: studentOtherNames,
      studentEmail: auth?.currentUser?.email,
      studentPhoneNumber: studentPhoneNumber,
      studentInstitution: studentInstitution,
      studentLevel: studentLevel,
      studentCourse: studentCourse,
      aboutStudent: aboutStudent,
      durationOfInternship: durationOfInternship,
      idFileReference: "insertStringHere",
      siwesFileReference: "insertStringHere",
      isReviewed: false,
      isAccepted: false,
      isRejected: false,
      hasBeenInvitedForTest: false,
      hasWrittenApplicationTest: false,
      hasGottenPlacement: false,
      placedTo: "yetToBePlaced",
      //invitationID
      applicationTestScore: 0,
      createdAt: serverTimestamp(),
    }).then((feedback) => {
      setConditionGood("good");
      setStatusBarMessage("successfully submitted application");
      console.log(feedback);
    });
  } catch (err) {
    console.error(err);
    setConditionGood("error");
    setStatusBarMessage("ERROR: couldn't submit your application");
  }
  //  finally {
  //   setApplicationStatusCreationLoading(false);
  // }
}

export async function acceptApplication(
  id,
  returnedDocument,
  setReturnedDocument,
  setApplicationStatusUpdateLoading,
  setApplicationStatusUpdateError
) {
  const applicationDocumentRef = doc(db, "studentApplication", id);

  setApplicationStatusUpdateLoading(true);
  try {
    await updateDoc(applicationDocumentRef, {
      isAccepted: true,
      isRejected: false,
    }).then(() => {
      setReturnedDocument({
        ...returnedDocument,
        isAccepted: true,
        isRejected: false,
      });
    });
    setApplicationStatusUpdateLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setApplicationStatusUpdateError(err);
    setApplicationStatusUpdateLoading(false);
  } finally {
    setApplicationStatusUpdateLoading(false);
  }
}

export async function rejectApplication(
  id,
  returnedDocument,
  setReturnedDocument,
  setApplicationStatusUpdateLoading,
  setApplicationStatusUpdateError
) {
  const applicationDocumentRef = doc(db, "studentApplication", id);

  setApplicationStatusUpdateLoading(true);
  try {
    await updateDoc(applicationDocumentRef, {
      isAccepted: false,
      isRejected: true,
      hasGottenPlacement: false,
      placedTo: "yetToBePlaced",
    }).then(() => {
      setReturnedDocument({
        ...returnedDocument,
        isAccepted: false,
        isRejected: true,
        hasGottenPlacement: false,
        placedTo: "yetToBePlaced",
      });
    });
    setApplicationStatusUpdateLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setApplicationStatusUpdateError(err);
    setApplicationStatusUpdateLoading(false);
  } finally {
    setApplicationStatusUpdateLoading(false);
  }
}

export async function markApplicationAsUnderReview(
  id,
  returnedDocument,
  setReturnedDocument,
  setApplicationStatusUpdateLoading,
  setApplicationStatusUpdateError
) {
  const applicationDocumentRef = doc(db, "studentApplication", id);

  setApplicationStatusUpdateLoading(true);
  try {
    await updateDoc(applicationDocumentRef, {
      isReviewed: true,
    }).then(() => {
      setReturnedDocument({
        ...returnedDocument,
        isReviewed: true,
      });
    });
    setApplicationStatusUpdateLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setApplicationStatusUpdateError(err);
    setApplicationStatusUpdateLoading(false);
  } finally {
    setApplicationStatusUpdateLoading(false);
  }
}

export async function unmarkApplicationAsUnderReview(
  id,
  returnedDocument,
  setReturnedDocument,
  setApplicationStatusUpdateLoading,
  setApplicationStatusUpdateError
) {
  const applicationDocumentRef = doc(db, "studentApplication", id);

  setApplicationStatusUpdateLoading(true);
  try {
    await updateDoc(applicationDocumentRef, {
      isReviewed: false,
    }).then(() => {
      setReturnedDocument({
        ...returnedDocument,
        isReviewed: false,
      });
    });
    setApplicationStatusUpdateLoading(false);
    //.filter((doc) => !doc.isRejected && !doc.isAccepted);
  } catch (err) {
    console.error(err);
    setApplicationStatusUpdateError(err);
    setApplicationStatusUpdateLoading(false);
  } finally {
    setApplicationStatusUpdateLoading(false);
  }
}

export async function placeApplicant(
  unit,
  applicationID,
  setPlacementError,
  returnedDocument,
  setReturnedDocument,
  setApplicationStatusUpdateLoading
) {
  let applicationToBeUpdated = doc(db, "studentApplication", applicationID);
  setApplicationStatusUpdateLoading(true);
  try {
    await updateDoc(applicationToBeUpdated, {
      hasGottenPlacement: true,
      placedTo: unit,
    }).then(() => {
      console.log("weve placed");
      setReturnedDocument({
        ...returnedDocument,
        hasGottenPlacement: true,
        placedTo: unit,
      });
    });
  } catch (error) {
    setApplicationStatusUpdateLoading(true);
    console.log(error);
    setPlacementError(error);
  } finally {
    setApplicationStatusUpdateLoading(false);
  }
}
