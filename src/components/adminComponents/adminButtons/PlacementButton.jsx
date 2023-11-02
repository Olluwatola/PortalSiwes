import {placeApplicant} from "./../../../controllers/applicationControllers"
const PlacementButton = ({
  returnedDocument,
  setReturnedDocument,
  hasBeenApproved,
  setPlacementError,
  children,
  applicationID,
  setApplicationStatusUpdateLoading
}) => {
  // async function placeApplicant(unit, applicationID) {
  //   let applicationToBeUpdated = doc(db, "studentApplication", applicationID);
  //   try {
  //     await updateDoc(applicationToBeUpdated, {
  //       hasGottenPlacement: true,
  //       placedTo: unit,
  //     }).then(() => {
  //       console.log(`placed ${applicationID} to ${unit}`);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     setPlacementError(error);
  //   }
  // }
  return (
    <button
      disabled={hasBeenApproved === false ? true : false || returnedDocument?.placedTo===children.toLowerCase()}
      onClick={() => {
        placeApplicant(children.toLowerCase(), applicationID,setPlacementError,returnedDocument,setReturnedDocument,setApplicationStatusUpdateLoading);
      }}
    >
      place applicant to {children}
    </button>
  );
};

export default PlacementButton;
