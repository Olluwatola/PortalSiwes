import { validateImage } from "image-validator";
import { db, auth, storage } from "./../config/firebase";
import {
  //getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { generateTimestampId } from "./../utils/idGenerator";
import FormSuccessModal from "./../components/mainAppComponents/FormSuccessModal";
import {
  //getDocs,
  //collection,
  //addDoc,
  //deleteDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const storageRef = ref(storage);
//const applicationCollectionRef = collection(db, "studentApplication");
//const applicationDocumentRef = doc(db, "studentApplication", id);

async function isImage(file) {
   const imageValidateResult= await validateImage(file); 
   return(imageValidateResult)
}

async function uploadFile(file, filetype, generatedID) {
  console.log(file);
  console.log("Type: " + file.type);
  console.log("Size: " + file.size + " bytes");
  return new Promise((resolve, reject) => {
    if (file) {
      //const refName = removeSpecialCharacters(auth?.currentUser?.email);
      const endRef = ref(storageRef, generatedID + "/" + filetype);

      //   uploadBytes(endRef, file)
      //     .then((snapshot) => {
      //       console.log(`Uploaded file!`);
      //     })
      //     .catch((error) => {
      //       console.error("Error uploading file:", error);
      //     });

      const metadata = {
        contentType: "image/jpeg",
      };

      const uploadTask = uploadBytesResumable(endRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
          reject(error); // Reject the Promise in case of an error
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL); // Resolve the Promise with the download URL
          } catch (error) {
            console.log("Error getting download URL:", error);
            reject(error); // Reject the Promise in case of an error
          }
        }
      );
    } else {
      console.log(`Can't find the file`);
      reject("No file found"); // Reject the Promise when there's no file
    }
  });
}

export async function createApplication(
  setsubmitButtonClicked,
  setConditionGood,
  setStatusBarMessage,
  IDFile,
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
  if (await isImage(IDFile.file) !== true || await isImage(siwesFile.file) !== true) {
    throw Error("Ensure your files are image files!");
  }
  setConditionGood("loading");
  setStatusBarMessage("Submitting your application...");
  const generatedID = generateTimestampId();
  try {
    const idDownloadLink = await uploadFile(IDFile.file, "IDFile", generatedID);
    const siwesFileDownloadLink = await uploadFile(
      siwesFile.file,
      "siwesFile",
      generatedID
    );
    console.log("lets seeee", idDownloadLink);
    console.log("lets see", siwesFileDownloadLink);

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
      idFileReference: idDownloadLink,
      siwesFileReference: siwesFileDownloadLink,
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
      setStatusBarMessage(null);
      setConditionGood("good");
      console.log(feedback);
    });
  } catch (err) {
    console.error(err);
    setsubmitButtonClicked(false);
    setConditionGood("error");
    setStatusBarMessage("ERROR: couldn't submit your application");
    return Error(err.message);
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
