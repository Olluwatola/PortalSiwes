import { placeApplicant } from "./../../../controllers/applicationControllers";
const PlacementButton = ({
  returnedDocument,
  setReturnedDocument,
  hasBeenApproved,
  setPlacementError,
  children,
  applicationID,
  setApplicationStatusUpdateLoading,
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
      disabled={
        hasBeenApproved === false
          ? true
          : false || returnedDocument?.placedTo === children.toLowerCase()
      }
      onClick={() => {
        placeApplicant(
          children.toLowerCase(),
          applicationID,
          setPlacementError,
          returnedDocument,
          setReturnedDocument,
          setApplicationStatusUpdateLoading
        );
      }}
      className={
        hasBeenApproved === false
          ? "bg-gray-300 text-gray-500 rounded-md px-4 py-2 cursor-not-allowed"
          : returnedDocument?.placedTo === children.toLowerCase()
          ? "bg-white text-slate-800 rounded-md px-4 py-2 border border-slate-800 cursor-not-allowed"
          : "bg-slate-800 text-white rounded-md px-4 py-2 hover:bg-slate-900 transition duration-200 ease-in-out"
      }
    >
      {returnedDocument?.placedTo === children.toLowerCase()
        ? "Placed to " + children
        : "Place to " + children}
    </button>
  );
};

export default PlacementButton;
