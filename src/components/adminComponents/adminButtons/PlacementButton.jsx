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
      className="bg-slate-900 text-white p-3 rounded-lg border hover:border-slate-900 hover:text-slate-900 hover:bg-white transition-all duration-200 ease-in-out"
    >
      Place to {children}
    </button>
  );
};

export default PlacementButton;
