import { doc, updateDoc } from "firebase/firestore";
import { db } from "./../config/firebase";

export async function placeToUnit(
  unit,
  arrayOfApplicantsToBePosted,
  setSuccessMessage,
  setPlacingError
) {
  //   console.log(`try to place to ${unit}`);
  //   console.log(arrayOfApplicantsToBePosted);
  try {
    arrayOfApplicantsToBePosted.map(async (element) => {
      let applicationDocumentRef = doc(db, "studentApplication", element?.id);
      await updateDoc(applicationDocumentRef, {
        hasGottenPlacement: true,
        placedTo: unit,
      });
    });
    setSuccessMessage(
      `successfully placed ${
        arrayOfApplicantsToBePosted.length
      } to ${unit.toUpperCase()}`
    );
  } catch (error) {
    console.log(error);
    setPlacingError(error);
  }
}
