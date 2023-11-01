import { db, auth, storage } from "./../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import {
  //getDocs,
  collection,
  addDoc,
  //deleteDoc,
  //updateDoc,
  //doc,
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
  setApplicationStatusCreationLoading,
  setApplicationStatusCreationError,
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
  setApplicationStatusCreationLoading(true);
  try {
    uploadFile(IDfile, "id");
    uploadFile(siwesFile, "siwesFile");

    await addDoc(applicationCollectionRef, {
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
      console.log(feedback);
    });
  } catch (err) {
    console.error(err);
    setApplicationStatusCreationError(err);
    setApplicationStatusCreationLoading(false);
  } finally {
    setApplicationStatusCreationLoading(false);
  }
}
